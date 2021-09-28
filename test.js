import fetch from "node-fetch";
const { CRYPTUM_TOKEN } = process.env;

/* fetch("https://cryptum.halodotapi.com/games/hmcc/stats/players/EpicGamer007313/service-record", {
	"method": "GET",
	"headers": {
		"Content-Type": "application/json",
		"Cryptum-API-Version": "2.3-alpha",
		"Authorization": `Cryptum-Token ${CRYPTUM_TOKEN}`
	}
}).then(res => res.json()).then(res => console.log(res.data, res.additional)); */

fetch("https://cryptum.halodotapi.com/games/hmcc/media/players/EpicGamer007313/clips", {
	"method": "GET",
	"headers": {
		"Content-Type": "application/json",
		"Cryptum-API-Version": "2.3-alpha",
		"Authorization": `Cryptum-Token ${CRYPTUM_TOKEN}`
	}
}).then(res => res.json()).then(res => console.log(res.data));



/* fetch("https://cryptum.halodotapi.com/games/hmcc/metadata/maps", {
	"method": "GET",
	"headers": {
		"Content-Type": "application/json",
		"Cryptum-API-Version": "2.3-alpha",
		"Authorization": `Cryptum-Token ${CRYPTUM_TOKEN}`
	}
}).then(res => res.json()).then(res => console.log(res.data));*/