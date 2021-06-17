if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/static/scripts/sw.js", { scope: "/" }).then((reg) => {
		console.log("Initialized service worker");
		console.log(reg);
	}).catch(() => {
		console.error("Error initializing service worker.");
	});
}