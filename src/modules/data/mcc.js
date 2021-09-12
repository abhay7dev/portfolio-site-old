import fetch from "node-fetch";

const getRand = (min = 1, max = 19) => {
	return Math.floor(Math.random() * (max - min) + min);
}

export default Object.freeze({
	/**
	 * Fetches image showing Halo MCC XP and returns body
	 */
	xp: async () => {
		return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/epicgamer007313/xp.jpg?v=1&bg=${getRand()}`)).body;
	},
	/**
	 * Fetches image showing Halo MCC game ranks and returns body
	 */
	ranks: async () => {
		return (await fetch(`https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/epicgamer007313/ranks.jpg?v=1&bg=${getRand()}`)).body;
	},
	/**
	 * Fetches Halo mcc statistics
	 */
	stats: async () => {
		return await (await fetch("https://halo.api.stdlib.com/mcc@0.1.0/stats?gamertag=epicgamer007313")).json();
	}
});