const CACHE_NAME = "offline";
const OFFLINE_URL = "/static/offline/offline.html";

const called = (text) => console.log(`%c${text} called`, "color: ghostwhite; font-size: 19px; background: black; padding: 4px; border: 2px solid ghostwhite; border-radius: 2px;");
const info = (text) => console.log(`\t%c[INFO]%c${text}`, "color: green; font-size: 13px; background: black; padding: 3px; margin: 0;", "color: ghostwhite; font-size: 13px; background: black; padding: 3px; margin: 0;");
const error = (errMes) => console.error(`%c${errMes}`, "font-size: 16px; background-color: black; color: red;");

self.addEventListener("install", (event) => {
	called("INSTALL");
	event.waitUntil((async () => {
		try {
			const cache = await caches.open(CACHE_NAME);
			info(`Opened Cache "${CACHE_NAME}"`);

			await cache.add(new Request(
				OFFLINE_URL, {
					cache: "reload"
				}
			));
			info("Cached offline page");
		} catch(err) {
			return error(err);
		}
	})());
});

self.addEventListener("activate", (event) => {
	called("ACTIVATE");
	event.waitUntil((async () => {
		if ("navigationPreload" in self.registration) {
			await self.registration.navigationPreload.enable();
			info("self.registration.navigationPreload.enable() called in function");
		}
	})());
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	called("FETCH");
	info(`Event request mode is ${event.request.mode}`);
	if (event.request.mode === "navigate") {
		event.respondWith((async () => {
			try {
				const preloadResponse = await event.preloadResponse;
				if (preloadResponse) {
					info("Got preloaded response");
					return preloadResponse;
				}

				const networkResponse = await fetch(event.request);
				info("Fetched through network")
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
				info(`fetch()ing resource ${event.request}`)
				return fetch(event.request);
			} catch(err) {
				error(err);
				return err;
			}
		})());
	}
});