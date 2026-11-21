const CACHE_NAME = 'atelie-bonecas-pwa-v3';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/dolls-data.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './assets/olivia/thumb.png',
  './assets/olivia/silhouette.png',
  './assets/larissa/thumb.png',
  './assets/larissa/silhouette.png',
  './assets/monica/thumb.png',
  './assets/monica/silhouette.png',
  './assets/alyne/thumb.png',
  './assets/alyne/silhouette.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
