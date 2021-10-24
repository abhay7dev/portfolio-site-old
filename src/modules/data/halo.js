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
	stats: async (username = "EpicGamer007313") => {
		return await fetchHDA(`/stats/players/${username}/service-record`);
	},
	ranks: async (username = "EpicGamer007313") => {
		return await fetchHDA(`/stats/players/${username}/ranks`);
	},
	matches: async (username = "EpicGamer007313") => {
		return await fetchHDA(`/stats/players/${username}/recent-matches`);
	},
	xp: async (username = "EpicGamer007313") => {
		return await fetchHDA(`/stats/players/${username}/xp`);
	},
	appearance: async (username = "EpicGamer007313") => {
		return await fetchHDA(`/appearance/players/${username}`);
	},
	clips: async (username = "EpicGamer007313") => {
		return await fetchHDA(`/media/players/${username}/clips`);
	},
	clip: (id) => {
		return `https://cryptum.halodotapi.com/games/hmcc/media/clips/${USER_ID}-${id}`;
	},
	images: {
		xp: async (username = "EpicGamer007313") => {
			return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/${username}/xp.jpg?v=1&bg=${getRand()}`)).body;
		},
		ranks: async (username = "EpicGamer007313") => {
			return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/${username}/ranks.jpg?v=1&bg=${getRand()}`)).body;
		},
	}
});

/**
 * Fetches Halo mcc statistics

stats: async () => {
return await (await fetch("https://halo.api.stdlib.com/mcc@0.1.0/stats?gamertag=epicgamer007313")).json();
}, */