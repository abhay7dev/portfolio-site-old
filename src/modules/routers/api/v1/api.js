import express from "express";
const router = express.Router();

import { home, errors } from "../../../../config.js";
import { join } from "path";

import { readdir } from "fs";

router.get("/rootfiles", (req, res) => {
	readdir(join(home, "public", "misc"), (err, files) => {
		if(err) return res.json({message: `Error reading files: ${err}`});
		res.json(files);
	});
});

router.use((req, res, next) => {
	if(
		req.get("X-Replit-User-Name").toLowerCase() === process.env.ADMIN_USER_NAME &&
		req.get("X-Replit-User-Id").toLowerCase() === process.env.ADMIN_USER_ID
	) {
		next();
	} else {
		data.error = errors[403];
		res.render("error", {
			data
		});
	}
});

export default router;
