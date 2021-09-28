import fetch from "node-fetch";
import { halo } from "../../config.js";
const { CRYPTUM_TOKEN, USER_ID } = halo;

const getRand = (min = 1, max = 19) => {
	return Math.floor(Math.random() * (max - min) + min);
}

const fetchHDA = async (url) => {
	return await (await fetch(`https://cryptum.halodotapi.com/games/hmcc${url}`, {
		headers: {
			"Content-Type": "application/json", 
			Authorization: `Cryptum-Token ${halo.CRYPTUM_TOKEN}`
		}
	})).json();
}

export default Object.freeze({
	stats: async () => {
		return await fetchHDA("/stats/players/EpicGamer007313/service-record");
	},
	ranks: async () => {
		return await fetchHDA("/stats/players/EpicGamer007313/ranks");
	},
	matches: async () => {
		return await fetchHDA("/stats/players/EpicGamer007313/recent-matche");
	},
	xp: async () => {
		return await fetchHDA("/stats/players/EpicGamer007313/xp");
	},
	appearance: async () => {
		return await fetchHDA("/appearance/players/EpicGamer007313");
	},
	clips: async () => {
		return await fetchHDA("/media/players/EpicGamer007313/clips");
	},
	clip: (id) => {
		return `https://cryptum.halodotapi.com/games/hmcc/media/clips/${USER_ID}-${id}`;
	},
	images: {
		xp: async () => {
			return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/EpicGamer007313/xp.jpg?v=1&bg=${getRand()}`)).body;
		},
		ranks: async () => {
			return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/EpicGamer007313/ranks.jpg?v=1&bg=${getRand()}`)).body;
		},
	}
});

/**
 * Fetches Halo mcc statistics

stats: async () => {
return await (await fetch("https://halo.api.stdlib.com/mcc@0.1.0/stats?gamertag=epicgamer007313")).json();
}, */