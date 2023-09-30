const CACHE_NAME = 'pwa-cache-v1'; // Change this to update the cache
const cacheUrls = [
    '/',
    '/index.html', // Add any other HTML files you have
    '/dark.css',
    '/app.js',
    '/icon.png',
    '/favicon.ico',
    '/localforage.js',
    '/manifest.json',
    '/audio-worklet.js',
    '/build/',
    '/build/nds.wasm',
    '/build/nds.js',
    // Add other assets and resources you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheUrls);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});
