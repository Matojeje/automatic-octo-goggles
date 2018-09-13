// https://stackoverflow.com/a/46541072

var CACHE_NAME = 'jse-shub-cache-v1';
var urlsToCache = [
	'./',
	'index.html',
    'service-worker.js',
    'manifest.json',
    'css/materialize.min.css',
	'js/materialize.min.js',
	'js/platform.js',
	'https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'favicon.ico',
    'android-chrome-192x192.png',
    'android-chrome-256x256.png',
    'normal-520x520.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];
console.log('loading sw');

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('installing sw');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                var x = cache.addAll(urlsToCache);
                console.log('cache added');
                return x;
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});