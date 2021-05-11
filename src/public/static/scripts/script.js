if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/static/scripts/sw.js", { scope: "/" })
		.then(() => {
			console.log("Initialized service worker");
		})
		.catch(() => {
			console.error("Error initializing service worker.");
		});
}
