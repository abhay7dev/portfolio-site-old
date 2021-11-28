export default () => {
	retrieveStatsListeners();
	retrieveClipsListeners();
}

export const retrieveStatsListeners = (selector = ".retrieve-halo-stats") => {
	document.querySelectorAll(selector).forEach((button) => {
		button.addEventListener("click", async () => {

			const pre = document.createElement("pre");
			
			const codeElem = document.createElement("code");

			button.innerText = "Fetching information";

			let haloInfo;
			try {
				haloInfo = await (await fetch("/api/halo/stats", {
					cache: "no-cache"
				})).json();
				codeElem.innerText = `Response: ${JSON.stringify(haloInfo, null, 4)}`;
				const emblem = document.createElement("img");
				emblem.src = haloInfo.additional.appearance.emblem_url;
				button.parentElement.appendChild(emblem);	
			} catch(err) {
				codeElem.innerText = `Error: ${err}`;
			}

			pre.appendChild(codeElem)
			button.parentElement.appendChild(pre);
			button.parentElement.removeChild(button);

		});
	});
}

export const retrieveClipsListeners = (selector = ".retrieve-halo-clips") => {
	document.querySelectorAll(selector).forEach((button) => {
		button.addEventListener("click", async () => {

			let elem;

			button.innerText = "Fetching clips";

			let clips;
			try {
				clips = await (await fetch("/api/halo/clips", {
					cache: "no-cache"
				})).json();
			} catch(err) {
				elem = document.createElement("code");
				elem.innerText = `Error: ${err}`;
			}

			if(clips) {
				elem = document.createElement("ul");
				elem.classList.add("list-style-type-none");
				clips.data.forEach((e) => {
					const li = document.createElement("li");
					const a = document.createElement("a");
					a.href = `/halo/${e.id}`;
					
					let thumbnail = document.createElement("img");
					thumbnail.src = e.thumbnail_urls.small.url;
					a.appendChild(thumbnail);

					li.appendChild(a);
					elem.appendChild(li);
				});
			}

			button.parentElement.appendChild(elem);
			button.parentElement.removeChild(button);

		});
	});
}