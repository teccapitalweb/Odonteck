/* ═══════════════════════════════════════════════════════════════════════════
   OdonTeck · Service Worker
   Que el sitio se pueda instalar como app y cargue rápido, sin que nadie
   llegue a ver contenido viejo.

   Estrategias:
     · Navegación (páginas)  → red primero; sin red, la página cacheada; si
                               tampoco está, offline.html.
     · Estáticos propios     → stale-while-revalidate: responde al instante
                               con lo cacheado y actualiza por detrás.
     · Otro origen           → NO se toca. Firebase, Stripe, Bunny y las
                               fuentes de Google van siempre a la red.
   ═══════════════════════════════════════════════════════════════════════════ */

const VERSION = 'odonteck-v3';
const CACHE_SHELL = VERSION + '-shell';
const CACHE_RUNTIME = VERSION + '-runtime';

/* Lo mínimo para que la app abra sin datos. */
const SHELL = [
  './',
  './index.html',
  './offline.html',
  './styles.css',
  './premium.css',
  './mobile.css',
  './script.js',
  './data.js',
  './pwa.js',
  './manifest.json',
  './assets/img/odonteck-favicon.png',
  './assets/img/odonteck-apple-touch.png'
];

/* ── Instalación ─────────────────────────────────────────────────────────── */
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_SHELL).then((c) =>
      // Uno por uno: si faltara un archivo, no tumba la instalación entera.
      Promise.all(SHELL.map((url) => c.add(url).catch(() => {})))
    )
  );
});

/* ── Activación ──────────────────────────────────────────────────────────── */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_SHELL && k !== CACHE_RUNTIME)
            .map((k) => caches.delete(k))
      ))
      // Rehacemos el shell por si el navegador lo vació por falta de espacio.
      .then(() => caches.open(CACHE_SHELL))
      .then((c) => Promise.all(SHELL.map((url) => c.add(url).catch(() => {}))))
      .then(() => self.clients.claim())
  );
});

/* Mantiene acotada la caché de uso: keys() devuelve en orden de inserción,
   así que se borran las entradas más antiguas. */
const TOPE_RUNTIME = 100;
function podar(cache) {
  return cache.keys().then((keys) => {
    if (keys.length <= TOPE_RUNTIME) return;
    return Promise.all(
      keys.slice(0, keys.length - TOPE_RUNTIME).map((k) => cache.delete(k))
    );
  }).catch(() => {});
}

/* ── Peticiones ──────────────────────────────────────────────────────────── */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;

  // ── Navegación: red primero ────────────────────────────────────────────
  if (req.mode === 'navigate') {
    // Se guarda SIN query string: si no, cada ?utm_source=, ?fbclid= o
    // ?source=pwa crearía una copia distinta de la misma página.
    const clave = url.origin + url.pathname;
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_RUNTIME)
              .then((c) => c.put(clave, copy).then(() => podar(c)))
              .catch(() => {});
          }
          return res;
        })
        .catch(() =>
          caches.match(clave).then((r) => r || caches.match('./offline.html'))
        )
    );
    return;
  }

  // ── Estáticos: stale-while-revalidate ──────────────────────────────────
  if (/\.(css|js|png|jpg|jpeg|webp|svg|woff2?|ico|json)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const red = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE_RUNTIME)
                .then((c) => c.put(req, copy).then(() => podar(c)))
                .catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || red;
      })
    );
    return;
  }

  // ── Resto: red con respaldo en caché ───────────────────────────────────
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});
