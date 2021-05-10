self.addEventListener("install", (installEvent) => {
	installEvent.waitUntil(
		caches.open("Abhay").then((cache) => {
			cache.add([]);
		})
	);
});

self.addEventListener("fetch", (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);
});
