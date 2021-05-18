// https://web.dev/offline-fallback-page/

const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";

const OFFLINE_URL = "/offline";
const ROOT_RESOURCES_LIST_URL = "/api/v1/root-files";

self.addEventListener("install", (event) => {
	event.waitUntil((async () => {
		const cache = await caches.open(CACHE_NAME);
		if(cache) {
			try {
				await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
			} catch(err) {
				console.log("Error caching offline page. ", err);
			}
			try {
				const rootFiles = await ((await fetch(ROOT_RESOURCES_LIST_URL)).json());
				console.log("Recieved root files list: ");
				rootFiles.forEach(file => {
					cache.add(file);
				});
			} catch(err) {
				console.log("Error caching root assets. ", err);
			}
			/* try {
				const assetFiles = await ((await fetch(ASSET_RESOURCES_LIST_URL)).json());
				console.log("Recieved asset files list: ");
				assetFiles.forEach(file => {
					cache.add(file);
				});
			} catch(err) {
				console.log("Error caching root assets. ", err);
			} */
		} else {
			console.log("Cache not initialized. No caching to occur");
		}
	})());
	self.skipWaiting();
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
			} catch (error) {
				console.log("Fetch failed; returning offline page instead.", error);

				const cache = await caches.open(CACHE_NAME);
				const cachedResponse = await cache.match(OFFLINE_URL);
				return cachedResponse || "Error";
			}
		})());
	} else {
		event.respondWith((async () => {
			try {
				const cache = await caches.open(CACHE_NAME);
				const cachedResponse = await cache.match(event.request);
				if(cachedResponse) return cachedResponse;

				if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
					return;
				}
				
				return fetch(event.request);

			} catch(err) {
				console.log(`Error fetching resource ${event.request}. `, err);
				return err;
			}
		})());
	}
});