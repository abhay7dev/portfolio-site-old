import express from "express";
const router = express.Router();

import halo from "../../data/halo.js";

router.get("/:game/:func", async (req, res, next) => {
	const { game, func } = req.params;
	if(!game || !func || func == "images" || !halo[game] || !halo[game][func]) return next();

	try {
		const data = await halo[game][func](req.query.username);
		res.json(data);
	} catch(err) {
		console.log(err);
		res.json(err);
	}

});

router.get("/:game/images/:func", async (req, res, next) => {
	const { game, func } = req.params;
	if(!game || !func || !halo[game] || !halo[game].images || !halo[game].images[func]) return next();

	try {

		const data = await halo[game].images[func](req.query.username);
		if(typeof data === "string") return res.redirect(data);
		res.set("Content-Type", "image/jpeg");
		data.pipe(res);
		
	} catch(err) {
		console.log(err);
		res.json(err);
	}

});

export default router;