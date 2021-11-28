import fetchF from "node-fetch";
import { halo } from "../../config.js";
const { CRYPTUM_TOKEN, USER_ID } = halo;

const rand = (min = 1, max = 19) => {
	return Math.floor(Math.random() * (max - min) + min);
}

const fetch = {
	mcc: async (url) => {
		return await (await fetchF(`https://cryptum.halodotapi.com/games/hmcc${url}`, {
			headers: {
				"Content-Type": "application/json", 
				Authorization: `Cryptum-Token ${halo.CRYPTUM_TOKEN}`
			}
		})).json();
	},
	infinite: async (url) => {
		return await (await fetchF(`https://cryptum.halodotapi.com/games/hi${url}`, {
			headers: {
				"Content-Type": "application/json", 
				Authorization: `Cryptum-Token ${halo.CRYPTUM_TOKEN}`
			}
		})).json();
	},
	image: async (url) => {
		const img = await fetchF(url);
		if(img.status === 200) return img.body;
		return `/static/images/404.png`;
	},
}

export default Object.freeze({
	mcc: {
		stats: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/stats/players/${username}/service-record`);
		},
		ranks: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/stats/players/${username}/ranks`);
		},
		matches: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/stats/players/${username}/recent-matches`);
		},
		xp: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/stats/players/${username}/xp`);
		},
		appearance: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/appearance/players/${username}`);
		},
		screenshots: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/media/players/${username}/screenshots`);
		},
		clips: async (username = "EpicGamer007313") => {
			return await fetch.mcc(`/media/players/${username}/clips`);
		},
		images: {
			xp: async (username = "EpicGamer007313") => {
				return await fetch.image(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/${username}/xp.jpg?v=1&bg=${rand()}`);
			},
			ranks: async (username = "EpicGamer007313") => {
				return await fetch.image(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/${username}/ranks.jpg?v=1&bg=${rand()}`);
			},
		}
	},
	infinite: {
		stats: async (username = "EpicGamer007313") => {
			return await fetch.infinite(`/stats/players/${username}/service-record/global`);
		},
		matches: async (username = "EpicGamer007313") => {
			return await fetch.infinite(`/stats/players/${username}/matches`);
		},
		appearance: async (username = "EpicGamer007313") => {
			return await fetch.infinite(`/appearance/players/${username}`);
		},
		screenshots: async (username = "EpicGamer007313") => {
			return await fetch.infinite(`/media/players/${username}/screenshots`);
		},
		clips: async (username = "EpicGamer007313") => {
			return await fetch.infinite(`/media/players/${username}/clips`);
		},	
	},
});

/**
 * Fetches Halo mcc statistics

stats: async () => {
return await (await fetch("https://halo.api.stdlib.com/mcc@0.1.0/stats?gamertag=epicgamer007313")).json();
}, */