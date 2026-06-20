// Minimal service worker — enables installability + full-screen standalone
// launch. Intentionally does NOT cache: every request goes straight to the
// network, so deployed updates are always fresh (no offline support by design).
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request))
})
