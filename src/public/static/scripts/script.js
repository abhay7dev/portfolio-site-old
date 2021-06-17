if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/static/scripts/sw.js", { scope: "/" }).then((reg) => {
		console.log("Initialized service worker");
		console.log(reg);
	}).catch(() => {
		console.error("Error initializing service worker.");
	});
}

// The following is originally from here: http://www.javascriptkit.com/dhtmltutors/page-transition-tutorial.shtml

const minLoadingTime = 100;
const maxLoadingTime = 3000

const startTime = new Date();
let elapsedTime;
let dismissonLoadFunc, maxLoadingTimer;

window.addEventListener('load', dismissonLoadFunc = () => {
	clearTimeout(maxLoadingTimer);
	elapsedTime = new Date() - startTime;
	const hidepageloadertimer = (elapsedTime > minLoadingTime) ? 0 : minLoadingTime - elapsedTime;

	setTimeout(() => {
		document.getElementById('pageloader').classList.add('dimissloader');
	}, hidepageloadertimer);

}, false);

maxLoadingTimer = setTimeout(() => {
	window.removeEventListener('load', dismissonLoadFunc, false);
	document.getElementById('pageloader').classList.add('dimissloader');
}, maxLoadingTime);

window.addEventListener('beforeunload', () => {
	document.body.classList.add('fadeout');
}, false);