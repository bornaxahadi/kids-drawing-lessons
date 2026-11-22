// Keeps the app on the iPad after the first visit, so it opens fast. Updates arrive on the next open.
const CACHE = 'dayan-v1';
const FILES = ['./', 'index.html', 'girls.js', 'things.js', 'solid.js', 'advanced.js', 'more.js', 'icon.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request);
    const net = fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net; // show the saved copy right away, refresh it in the background
  }));
});
