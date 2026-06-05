// ════════════════════════════════════════════════════════════════
//  OdonTeck · Servicio de NOTICIAS (cron NewsData.io → Firestore)
//  NO maneja pagos. Solo trae noticias dentales con portada y las
//  guarda en `noticias_auto`, borrando las de más de 15 días.
//  Variables necesarias en Railway:
//    - FIREBASE_SERVICE_ACCOUNT  (JSON de la cuenta de servicio)
//    - NEWSDATA_API_KEY          (tu key pub_...)
//    - CRON_KEY                  (opcional, default 'odonteck2026')
// ════════════════════════════════════════════════════════════════

const express = require('express');
const admin   = require('firebase-admin');
const cron    = require('node-cron');
const { actualizarNoticias, limpiarNoticiasViejas } = require('./services/noticias');

const app = express();

// ══ FIREBASE ADMIN ═══════════════════════════════════════════
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('❌ FATAL: Falta FIREBASE_SERVICE_ACCOUNT en variables de entorno');
  process.exit(1);
}
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (e) {
  console.error('❌ FATAL: FIREBASE_SERVICE_ACCOUNT no es JSON válido');
  process.exit(1);
}
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// ══ HEALTH CHECK ═════════════════════════════════════════════
app.get('/', (req, res) => res.json({
  status: 'OdonTeck Noticias Online ✅',
  timestamp: new Date().toISOString()
}));

// ══ DISPARO MANUAL (para probar al instante) ═════════════════
// GET /cron/noticias?key=TU_CRON_KEY
app.get('/cron/noticias', async (req, res) => {
  if (req.query.key !== (process.env.CRON_KEY || 'odonteck2026')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  try {
    const r1 = await actualizarNoticias(db);
    const r2 = await limpiarNoticiasViejas(db);
    res.status(200).json({ ok: true, ...r1, ...r2 });
  } catch (err) {
    console.error('Cron noticias (manual) error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ══ INICIAR SERVIDOR ═════════════════════════════════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 OdonTeck Noticias corriendo en puerto ${PORT}`);
  console.log(`📰 Cron cada 12 h + GET /cron/noticias?key=…`);
});

// ══ CRON DE NOTICIAS DENTALES ════════════════════════════════
// Corre cada 12 horas. Trae noticias con portada y borra SOLO las de +15 días.
cron.schedule('0 */12 * * *', async () => {
  console.log('⏰ Cron de noticias ejecutándose…');
  try {
    await actualizarNoticias(db);
    await limpiarNoticiasViejas(db);
  } catch (err) {
    console.error('Cron noticias error:', err.message);
  }
});

// Una corrida al arrancar, para que haya noticias desde el primer deploy
(async () => {
  try {
    await actualizarNoticias(db);
    await limpiarNoticiasViejas(db);
  } catch (err) {
    console.error('Cron noticias (arranque) error:', err.message);
  }
})();
