/* ============================================================
   SERVICE WORKER — MCB Grace PWA
   Version 1.0
   ============================================================ */

const CACHE_NAME = 'mcb-grace-v1';
const RUNTIME_CACHE = 'mcb-runtime-v1';

/* ===== FILES TO CACHE ON INSTALL ===== */
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './table.html',
    './monthly_schedule.html',
    './devotional.html',
    './certificate.html',
    './navbar.js',
    './manifest.json',

    /* Icons */
    './icons/icon-72.png',
    './icons/icon-96.png',
    './icons/icon-128.png',
    './icons/icon-144.png',
    './icons/icon-152.png',
    './icons/icon-192.png',
    './icons/icon-384.png',
    './icons/icon-512.png',
    './icons/icon-maskable-192.png',
    './icons/icon-maskable-512.png',

    /* Shortcuts */
    './icons/shortcut-table.png',
    './icons/shortcut-devotional.png',
    './icons/shortcut-monthly.png',
    './icons/shortcut-certificate.png'
];

/* ============================================================
   1. INSTALL — cache all core assets
   ============================================================ */
self.addEventListener('install', (event) => {
    console.log('🔧 [SW] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 [SW] Caching core assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('✅ [SW] Install complete');
                /* Activate immediately — huwag hintayin ang old tabs */
                return self.skipWaiting();
            })
            .catch((err) => {
                console.error('❌ [SW] Install failed:', err);
            })
    );
});

/* ============================================================
   2. ACTIVATE — clean up old caches
   ============================================================ */
self.addEventListener('activate', (event) => {
    console.log('🚀 [SW] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('🗑️ [SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                        return null;
                    })
                );
            })
            .then(() => {
                console.log('✅ [SW] Activate complete');
                /* Take control of all open pages immediately */
                return self.clients.claim();
            })
    );
});

/* ============================================================
   3. FETCH — serve from cache first, then network
   ============================================================ */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    /* Skip non-GET requests */
    if (request.method !== 'GET') return;

    /* Skip cross-origin requests (e.g., Unsplash images) — hayaan lang ang browser */
    if (url.origin !== self.location.origin) {
        event.respondWith(
            fetch(request).catch(() => {
                /* Kung offline at cross-origin, i-return ang blank */
                return new Response('', { status: 408 });
            })
        );
        return;
    }

    /* Skip chrome-extension at iba pang non-http */
    if (!url.protocol.startsWith('http')) return;

    /* ===== CACHE-FIRST STRATEGY for HTML, JS, CSS, images ===== */
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    /* May cached copy — i-serve agad */
                    return cachedResponse;
                }

                /* Wala sa cache — fetch from network */
                return fetch(request)
                    .then((networkResponse) => {
                        /* I-cache ang bagong response for future */
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(RUNTIME_CACHE).then((cache) => {
                                cache.put(request, responseClone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        /* Offline fallback */
                        if (request.mode === 'navigate') {
                            /* Kung navigation, i-return ang cached index.html */
                            return caches.match('./index.html');
                        }
                        /* Kung asset, i-return ang fallback response */
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

/* ============================================================
   4. MESSAGE — handle skip waiting from client
   ============================================================ */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('⚡ [SW] Skip waiting requested');
        self.skipWaiting();
    }
});

/* ============================================================
   5. PUSH NOTIFICATIONS (optional — para sa future)
   ============================================================ */
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'New update from MCB Grace',
        icon: './icons/icon-192.png',
        badge: './icons/icon-96.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || './'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'MCB Grace', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data.url || './';
    event.waitUntil(
        clients.openWindow(url)
    );
});

/* ============================================================
   6. BACKGROUND SYNC (optional — para sa future)
   ============================================================ */
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-devotionals') {
        console.log('🔄 [SW] Background sync: devotionals');
        /* Future: sync devotionals to server */
    }
});

console.log('🎉 [SW] MCB Grace Service Worker loaded');
