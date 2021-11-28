if(location.pathname === "/unsupported") location.pathname = "/";

import setUpGithub from "./modules/github.js";

// Data about page
const versionElem = document.querySelector(`meta[name="version"]`);
console.log(`Site version: ${versionElem ? versionElem.content : "No version specified"}`)

// Register the service worker for PWA

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/static/scripts/sw.js", { scope: "/" }).then((reg) => {
		console.log("Initialized service worker");
	}).catch((err) => {
		console.error("Error initializing service worker.", err);
	});
}

setUpGithub();

/* const unload = () => {
	document.querySelectorAll("button").forEach((bt) => {
		const newElem = bt.cloneNode(true);
		bt.parentNode.replaceChild(newElem, bt);
	});
}


init();
// Swup
if(window.Swup && window.SwupHeadPlugin) {
	const plugins = [
		new window.SwupHeadPlugin(),
	];
	if(window.SwupDebugPlugin) {
		plugins.push(new SwupDebugPlugin());
	}

	const swup = new window.Swup({
		plugins
	});
	swup.on("contentReplaced", init);
	swup.on('willReplaceContent', unload);
} */