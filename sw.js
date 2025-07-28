const CACHE_NAME = 'rutina-postura-cache-v5';
// Como tu app es un solo archivo, solo necesitamos cachear el archivo principal.
const urlsToCache = [
  './' 
];

// Evento de instalación: se abre el caché y se agregan los archivos.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento fetch: responde con los archivos del caché si están disponibles.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      })
  );
});
