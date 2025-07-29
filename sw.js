const CACHE_NAME = 'posture-routine-v2'; // Cambia a v3, v4, etc., cuando actualices archivos
const URLS_TO_CACHE = [
    './',
    './index.html',
    // Íconos de la App
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    // Imágenes de los ejercicios
    './img/1_thoracic_rotations.jpg',
    './img/2_cobra_pose.jpg',
    './img/3_over_and_backs.jpg',
    './img/4_reverse_wall_angels.jpg',
    './img/5_chin_tucks.jpg'
];

// Evento de instalación: se abre el caché y se añaden los recursos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Evento fetch: responde desde el caché si es posible, si no, va a la red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la respuesta está en el caché, la retorna
                if (response) {
                    return response;
                }
                // Si no, la busca en la red
                return fetch(event.request);
            })
    );
});

// Evento de activación: limpia cachés antiguos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
