import express from "express";
const router = express.Router();

import { home, errors } from "../../../../config.js";
import { join } from "path";

import readdir from "../../../data/files.js";

router.get("/root-files", (req, res) => {
	readdir(join(home, "public", "misc")).then(resp => {
		for(let i = 0; i < resp.length; i++) {
			resp[i] = resp[i].substring(resp[i].indexOf("misc") + "misc".length, resp[i].length);
		}
		res.json(resp);
	}).catch(err => {
		console.log(err);
		res.json({error: err});
	});

});

router.get("/asset-files", (req, res) => {
	readdir(join(home, "public", "static")).then(resp => {
		for(let i = 0; i < resp.length; i++) {
			resp[i] = resp[i].substring(resp[i].indexOf("public") + "public".length, resp[i].length);
		}
		res.json(resp);
	}).catch(err => {
		res.json({error: err});
	});
});

// Might remove for github auth instead
router.use((req, res, next) => {
	if(
		req.get("X-Replit-User-Name").toLowerCase() === process.env.ADMIN_USER_NAME &&
		req.get("X-Replit-User-Id").toLowerCase() === process.env.ADMIN_USER_ID
	) {
		next();
	} else {
		res.data.error = errors[403];
		res.render("error", {
			data
		});
	}
});

export default router;
