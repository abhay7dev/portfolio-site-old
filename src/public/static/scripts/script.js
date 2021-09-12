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

const interactibles = [];

const init = () => {

	// Github buttons
	document.querySelectorAll(".github_login").forEach((button) => {
		button.addEventListener("click", () => {
			location.pathname = "/login";
		}, {once: true});
		interactibles.push(button);
	});
	document.querySelectorAll(".github_logout").forEach((button) => {
		button.addEventListener("click", () => {
			fetch("/logout", {
				method: "POST"
			}).then((resp) => {
				console.log(resp);
				location.reload();
			}).catch((err) => {
				console.err(err);
				location.reload();
			});
		}, {once: true});
		interactibles.push(button);
	});

	// Halo (temporary)
	document.querySelectorAll(".retrieve-halo-stats").forEach((button) => {
		button.addEventListener("click", async () => {
			
			const codeElem = document.createElement("code");

			button.innerText = "Fetching information";

			let haloInfo;
			try {
				haloInfo = await (await fetch("/api/halo/stats", {
					cache: "no-cache"
				})).json();
				codeElem.innerText = `Response: ${JSON.stringify(haloInfo)}`;
			} catch(err) {
				codeElem.innerText = `Error: ${err}`;
			}

			button.parentElement.appendChild(codeElem);
			button.parentElement.removeChild(button);

		}, {once: true});
		interactibles.push(button);
	});

}

init();

const unload = () => {
	interactibles.length = 0;
}

// Swup
if(window.Swup && window.SwupHeadPlugin) {
	const plugins = [new window.SwupHeadPlugin()];
	if(window.SwupDebugPlugin) {
		plugins.push(new SwupDebugPlugin());
	}

	const swup = new window.Swup({
		plugins
	});
	swup.on('contentReplaced', init);
	swup.on('willReplaceContent', unload);
}
// Event listeners