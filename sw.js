
const CACHE_NAME = "digital-clock-v1";

const FILES_TO_CACHE = [
    "./",
    "./digital-clock.html",
    "./digital-clock.css",
    "./digital-clock.js",
    "./manifest.json",
    "./fonts/Digital/digital-7-mono.ttf",
    "./icons/clock-192.png",
    "./icons/clock-512.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedFile) {
            return cachedFile || fetch(event.request);
        })
    );
});
