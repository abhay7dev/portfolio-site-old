const CACHE_NAME = "offline";
const OFFLINE_URL = "/static/offline/offline.html";

const error = (errMes) => console.error(`%c${errMes}`, "font-size: 16px; background-color: black; color: red;");

self.addEventListener("install", (event) => {
	event.waitUntil((async () => {
		try {
			const cache = await caches.open(CACHE_NAME);

			await cache.add(new Request(
				OFFLINE_URL, {
					cache: "reload"
				}
			));
		} catch(err) {
			return error(err);
		}
	})());
});

self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		if ("navigationPreload" in self.registration) {
			await self.registration.navigationPreload.enable();
		}
	})());
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	if (event.request.mode === "navigate") {
		event.respondWith((async () => {
			try {
				const preloadResponse = await event.preloadResponse;
				if (preloadResponse) {
					return preloadResponse;
				}

				const networkResponse = await fetch(event.request);
				return networkResponse;
			} catch (err) {
				error(err);

				try {
					const cache = await caches.open(CACHE_NAME);
					const cachedResponse = await cache.match(OFFLINE_URL);
					if(cachedResponse == undefined) {
						error(`Response from cache for offline page is ${cachedResponse}`);		
						return (await fetch(OFFLINE_URL));
					}
					return cachedResponse;			
				} catch(ferr) {
					error(ferr);
					return "Offline";
				}
			}
		})());
	} else {
		event.respondWith((async () => {
			try {
				if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
					return;
				}
				return fetch(event.request);
			} catch(err) {
				error(err);
				return err;
			}
		})());
	}
});