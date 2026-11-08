const CACHE_NAME = 'secops-portfolio-v8';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './icons/icon-192.svg',
    './icons/icon-512.svg',
    './js/app.js',
    './js/modules/ToastNotification.js',
    './js/modules/UserProfile.js',
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

    // Deixa arquivos PDF serem carregados diretamente pelo visualizador nativo do navegador
    if (event.request.url.toLowerCase().includes('.pdf')) {
        return;
    }

    event.respondWith(
        fetch(event.request, { cache: 'no-cache' })
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return networkResponse;
            })
            .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
});
