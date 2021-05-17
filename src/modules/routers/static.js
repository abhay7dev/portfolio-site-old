import express from "express";
const router = express.Router();
import { home, serverSettings as config } from "../../config.js";
import { join } from "path";

import { readdir } from "fs";

router.use((req, res, next) => {
	if(req.hostname.toLowerCase() !== config.MAIN_DOMAIN.toLowerCase()) {
		return res.redirect(`${config.MAIN_HREF}/${req.path}`);
	}
	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("Content-Security-Policy");
	res.set("Cache-Control", "immutable, max-age=31536000");
	if (req.path.indexOf("sw.js") !== -1) {
		res.set("Service-Worker-Allowed", "../../");
	}
	next();
});

router.use(
	"/static/",
	express.static(join(home, "public", "static"), {
		etag: false,
	})
);

router.use(
	express.static(join(home, "public", "misc"), {
		etag: false,
	})
);

router.get("/allfiles", (req, res) => {
	readdir(join(home, "public", "misc"), (err, files) => {
		if(err) return res.json({message: `Error reading files: ${err}`});
		return res.json({ files });
	});
});

export default router;
