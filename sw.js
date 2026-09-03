const CACHE = 'roundings-v9';
const PRECACHE = ['vendor/fonts/fonts.css', 'vendor/fonts/IBMPlexMono-400-latin-ext.woff2', 'vendor/fonts/IBMPlexMono-400-latin.woff2', 'vendor/fonts/IBMPlexMono-600-latin-ext.woff2', 'vendor/fonts/IBMPlexMono-600-latin.woff2', 'vendor/fonts/Saira-400-latin-ext.woff2', 'vendor/fonts/Saira-400-latin.woff2', 'vendor/fonts/Saira-500-latin-ext.woff2', 'vendor/fonts/Saira-500-latin.woff2', 'vendor/fonts/Saira-600-latin-ext.woff2', 'vendor/fonts/Saira-600-latin.woff2', 'vendor/fonts/Saira-700-latin-ext.woff2', 'vendor/fonts/Saira-700-latin.woff2', 'vendor/fonts/Saira-800-latin-ext.woff2', 'vendor/fonts/Saira-800-latin.woff2',
  './', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'vendor/jspdf.umd.min.js', 'vendor/jspdf.plugin.autotable.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// App shell: cache-first. Fonts (fonts.googleapis.com / fonts.gstatic.com): cache
// what we fetch so the app still has its faces offline after the first online load.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // ORC certificate data: network-first so weekly refreshes arrive,
  // falling back to the cached copy offline.
  if (url.origin === location.origin && url.pathname.includes('/data/orc/')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        const cacheable = url.origin === location.origin ||
          url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
        if (cacheable && res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match('index.html'));
    })
  );
});
