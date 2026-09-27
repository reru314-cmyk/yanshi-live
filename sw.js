const CACHE = 'yanshi-live-v22';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './hero-top-banner.png',
  './couple-kiss-banner.png',
  './couple-hug-vertical.png',
  './couple-height-gaze-v18.png',
  './yanshi-head-1.jpg',
  './yanshi-head-2.jpg',
  './yanshi-head-3.jpg',
  './yanshi-head-4.jpg',
  './yanshi-seaside-wide.png',
  './yanshi-stage-wide.png',
  './yanshi-lounge-vertical.png',
  './yanshi-work-lifestyle-v21.png',
  './yanshi-us-lifestyle-v21.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Network-first: updated GitHub Pages assets win; cache is only fallback.
  event.respondWith(
    fetch(req, {cache:'no-store'})
      .then(resp => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return resp;
      })
      .catch(() => caches.match(req))
  );
});
