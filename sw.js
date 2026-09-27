const CACHE = 'yanshi-live-v17';
const STATIC_ASSETS = [
  './yanshi_portrait.png',
  './yanshi_suit.png',
  './yanshi_seaside.png',
  './yanshi_stage.png',
  './couple-height.png',
  './ningxi-portrait.png'
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
  const url = new URL(req.url);

  if (url.pathname.endsWith('live-state.json')) {
    event.respondWith(fetch(req, {cache:'no-store'}));
    return;
  }

  if (
    req.mode === 'navigate' ||
    req.destination === 'document' ||
    url.pathname.endsWith('manifest-v8.webmanifest') ||
    url.pathname.includes('ylive-icon-') ||
    url.pathname.endsWith('ylive-touch.png')
  ) {
    event.respondWith(
      fetch(req, {cache:'no-store'}).catch(() => caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(resp => {
        if (resp && resp.ok) {
          caches.open(CACHE).then(cache => cache.put(req, resp.clone()));
        }
        return resp;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
