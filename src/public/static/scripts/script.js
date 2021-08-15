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

// Swup

new window.Swup({
	plugins: [new window.SwupHeadPlugin()]
});

// Event listeners

document.querySelectorAll(".github_login").forEach(button => {
	button.addEventListener("click", () => {
		location.pathname = "/login";
	});
});