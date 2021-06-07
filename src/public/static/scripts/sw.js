// https://web.dev/offline-fallback-page/

const CACHE_NAME = "offline";

const OFFLINE_URL = "/static/offline/offline.html";
const OFFLINE_ASSETS = ["/static/images/bg.jpg", "/static/fonts/halo-outline.ttf", "/favicon.ico", "/android-chrome-192x192.png", "/android-chrome-512x512.png", "/apple-touch-icon.png", "/favicon-16x16.png", "/favicon-32x32.png", "/manifest.webmanifest", "/mstile-150x150.png", "/safari-pinned-tab.svg"];

console.group("%cASSET URLS", "color: red; font-size: 30px;");
console.table({CACHE_NAME, OFFLINE_URL, OFFLINE_ASSETS});
console.groupEnd();

self.addEventListener("install", (event) => {
	console.log("%cInstall event called", "color: green;");
	event.waitUntil((async () => {
		const cache = await caches.open(CACHE_NAME);
		if(cache) {
			try {
				await cache.add(new Request(
					OFFLINE_URL, {
						cache: "reload"
					}
				));
				console.log("Cached offline page");
			} catch(err) {
				console.log("Error caching offline page: ", err);
			}
			try {
				OFFLINE_ASSETS.forEach(async (file) => {
					await cache.add(new Request(
						file, {
							cache: "default"
						}
					));
				});
				console.log("Cached OFFLINE_ASSETS")
			} catch(err) {
				console.log("Error caching root assets. ", err);
			}
		} else {
			console.log("Cache not initialized. No caching to occur");
		}
	})());
	// self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	console.log("service worker activated");
	event.waitUntil((async () => {
		if ("navigationPreload" in self.registration) {
			await self.registration.navigationPreload.enable();
		}
	})());
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	console.log("%cFetch called", "color: yellow;");
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
				console.log(event);
				console.log(`Fetch failed; returning offline page instead.`, error);

				try {

					const cache = await caches.open(CACHE_NAME);
					const cachedResponse = await cache.match(OFFLINE_URL);
					console.log(cachedResponse);
					if(cachedResponse == undefined) {
						console.log("Request is undefined");
						console.warn("Error opening cache or getting offline page.");
						
						return (await fetch(OFFLINE_URL));
					}
					return cachedResponse;

				} catch(err) {
					console.warn("Error opening cache or getting offline page.");
					return "You are offline";
				}
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