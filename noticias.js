// ════════════════════════════════════════════════════════════════
//  services/noticias.js · OdonTeck
//  Trae noticias DENTALES de NewsData.io (15 áreas, español + inglés),
//  las guarda en Firestore `noticias_auto` CON portada, y borra
//  SOLO las que tienen más de 15 días (NO borra todo cada corrida).
// ════════════════════════════════════════════════════════════════

const admin = require('firebase-admin');
const crypto = require('crypto');

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;
const DIAS_VIDA   = 15;   // ← las noticias viven 15 días, luego se borran
const MAX_GUARDAR = 18;   // tope de noticias nuevas por corrida

// ── Consultas que cubren las 15 áreas dentales (ES + EN) ──
// Se mantienen en términos ESTRICTAMENTE odontológicos (nada industrial).
const CONSULTAS = [
  { q: 'odontología OR dentista OR "salud bucal" OR "clínica dental" OR "odontología preventiva"', lang: 'es' },
  { q: 'ortodoncia OR endodoncia OR periodoncia OR "implante dental" OR odontopediatría', lang: 'es' },
  { q: '"cirugía oral" OR "estética dental" OR "prótesis dental" OR "rehabilitación oral" OR "blanqueamiento dental"', lang: 'es' },
  { q: 'dentistry OR dentist OR "oral health" OR orthodontics OR "dental clinic"', lang: 'en' },
  { q: 'endodontics OR periodontics OR "dental implant" OR "pediatric dentistry" OR "oral surgery"', lang: 'en' }
];

// Colores de la paleta OdonTeck (para el widget de actividad del panel)
const COLORES = ['#5B92C8', '#3E6FA8', '#6FB8B0', '#4FA39B', '#60A5FA'];

function idDesdeLink(link) {
  return crypto.createHash('md5').update(String(link)).digest('hex').slice(0, 20);
}

async function fetchNoticias(consulta) {
  const url = `https://newsdata.io/api/1/latest?apikey=${NEWSDATA_API_KEY}`
            + `&q=${encodeURIComponent(consulta.q)}`
            + `&language=${consulta.lang}`
            + `&image=1&size=10`;   // image=1 → solo noticias CON portada
  try {
    const r = await fetch(url);
    if (!r.ok) {
      console.warn('[noticias] NewsData status', r.status, (await r.text()).slice(0, 200));
      return [];
    }
    const data = await r.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (e) {
    console.error('[noticias] error fetch:', e.message);
    return [];
  }
}

// ── Trae y guarda noticias nuevas (sin duplicar) ──
async function actualizarNoticias(db) {
  if (!NEWSDATA_API_KEY) {
    console.error('[noticias] ❌ Falta NEWSDATA_API_KEY en variables de entorno');
    return { guardadas: 0 };
  }
  console.log('[noticias] 🦷 Buscando noticias dentales…');

  // Recolectar de todas las consultas, deduplicando por link
  const porLink = new Map();
  for (const consulta of CONSULTAS) {
    const arts = await fetchNoticias(consulta);
    for (const a of arts) {
      if (!a.link || !a.title || !a.image_url) continue; // exige portada
      if (!porLink.has(a.link)) porLink.set(a.link, a);
    }
  }

  const articulos = [...porLink.values()].slice(0, MAX_GUARDAR);
  let guardadas = 0, i = 0;

  for (const a of articulos) {
    const ref = db.collection('noticias_auto').doc(idDesdeLink(a.link));
    const existe = await ref.get();
    if (existe.exists) continue; // ya estaba → no duplicar (conserva su fecha original)

    await ref.set({
      titulo: a.title,
      descripcion: a.description || '',
      fuente: a.source_id || a.source_name || 'Fuente',
      link: a.link,
      imagen: a.image_url,
      idioma: a.language || '',
      color: COLORES[i % COLORES.length],
      pubDate: a.pubDate || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    guardadas++; i++;
  }

  console.log(`[noticias] ✅ ${guardadas} noticias nuevas guardadas (de ${articulos.length} con portada encontradas).`);
  return { guardadas };
}

// ── Borra SOLO las noticias con más de 15 días (este es el fix del bug) ──
async function limpiarNoticiasViejas(db) {
  const limite = new Date(Date.now() - DIAS_VIDA * 24 * 60 * 60 * 1000);
  const corte  = admin.firestore.Timestamp.fromDate(limite);

  const snap = await db.collection('noticias_auto').where('createdAt', '<', corte).get();
  if (snap.empty) {
    console.log(`[noticias] 🧹 Nada que limpiar (todas tienen menos de ${DIAS_VIDA} días).`);
    return { borradas: 0 };
  }

  let borradas = 0, n = 0, batch = db.batch();
  for (const d of snap.docs) {
    batch.delete(d.ref); n++; borradas++;
    if (n === 400) { await batch.commit(); batch = db.batch(); n = 0; }
  }
  if (n > 0) await batch.commit();

  console.log(`[noticias] 🧹 Borradas ${borradas} noticias con más de ${DIAS_VIDA} días.`);
  return { borradas };
}

module.exports = { actualizarNoticias, limpiarNoticiasViejas, DIAS_VIDA };
