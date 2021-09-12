import express from "express";
const router = express.Router();

import mcc from "../../data/mcc.js";

router.get("/xp", async (req, res) => {
	try {
		const xpImg = await mcc.xp();
		res.set("Content-Type", "image/jpeg");
		xpImg.pipe(res);
	} catch(err) {
		console.log(err);
		res.json({err});
	}
});

router.get("/ranks", async (req, res) => {
	try {
		const ranksImg = await mcc.ranks();
		res.set("Content-Type", "image/jpeg");
		ranksImg.pipe(res);
	} catch(err) {
		console.log(err);
		res.json({err});
	}
});

router.get("/stats", async (req, res) => {
	try {
		const stats = await mcc.stats();
		res.json(stats);		
	} catch(err) {
		console.log(err);
		res.json({err});
	}
});

export default router;