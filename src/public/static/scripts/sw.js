self.addEventListener("install", (installEvent) => {
	console.log("Install event fired");
});

self.addEventListener("fetch", (fetchEvent) => {
	console.log(`Fetch called at ${fetchEvent.timeStamp}`);
	fetch(fetchEvent.request).then((response) => {
		console.log(`Sent request to ${response.url} and got response ${response.body}`);
	});
});
