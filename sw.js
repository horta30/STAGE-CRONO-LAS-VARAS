const CACHE = 'stage-crono-v4';
const ASSETS = [
  './',
  './index.html',
  './crono.html',
  './resultados.html',
  './assets/session.js',
  './assets/seg01.js',
  './assets/seg02.js',
  './assets/seg03.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting(); // activa inmediatamente
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // toma control de todas las tabs abiertas
});

self.addEventListener('fetch', e => {
  // Network first — si falla, caché
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
