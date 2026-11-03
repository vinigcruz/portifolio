const CACHE_NAME = 'vg-portfolio-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './icons/icon-192.svg',
    './icons/icon-512.svg',
    './js/app.js',
    './js/modules/StorageManager.js',
    './js/modules/ToastNotification.js',
    './js/modules/UserProfile.js',
    './js/modules/ModalManager.js',
    './js/modules/PitchPlayer.js',
    './js/modules/TerminalDiagnostics.js',
    './js/modules/PDFExporter.js',
    './js/modules/NavigationController.js',
    './js/modules/ContactFormHandler.js',
    './js/modules/PWAInstaller.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                const clone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone);
                });
                return networkResponse;
            })
            .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
});

