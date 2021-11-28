import express from "express";
const router = express.Router();

import mcc from "../../data/halo.js";

router.use((req, res, next) => {
	res.mccJson = async (func = req.path.substring(1)) => {
		try {
			let { username } = req.query;
			if(!username || username == "") username = "EpicGamer007313";
			const data = await mcc[func](username);
			res.json(data);
		} catch(err) {
			console.log(err);
			res.json({err});
		}
	}
	next();
});

router.get("/stats", (req, res) => {
	res.mccJson();
});

router.get("/ranks", (req, res) => {
	res.mccJson();
});

router.get("/matches", (req, res) => {
	res.mccJson();
});

router.get("/xp", (req, res) => {
	res.mccJson();
});

router.get("/appearance", (req, res) => {
	res.mccJson();
});

router.get("/clips", (req, res) => {
	res.mccJson();
});

router.get("/screenshots", (req, res) => {
	res.mccJson();
});

router.get("/xp", async (req, res) => {
	res.mccJson()
});

router.get("/appearance", async (req, res) => {
	res.mccJson()
});

export default router;