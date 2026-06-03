/* OdonTeck · Service Worker — network-first con respaldo de caché.
   No intercepta Firebase ni Stripe (solo recursos del mismo origen). */
var CACHE = 'odonteck-vip-v1';

self.addEventListener('install', function (e) { self.skipWaiting(); });

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      try { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); } catch (err) {}
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || caches.match('index.html') || caches.match('./');
      });
    })
  );
});
