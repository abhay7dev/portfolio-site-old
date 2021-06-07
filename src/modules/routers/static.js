import express from "express";
const router = express.Router();
import { home, serverSettings as config } from "../../config.js";
import { join } from "path";

router.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("Content-Security-Policy");
	if (req.path.indexOf("sw.js") !== -1) {
		res.set("Service-Worker-Allowed", "../../");
	} else if(req.path.indexOf(".webmanifest") !== -1) {
		res.set("Content-Type", `application/manifest+json; charset=utf-8`);
	} else if(req.path.indexOf(".xml") !== -1) {
		res.set("Content-Type", `text/xml; charset=utf-8`);
	}
	res.set("Cache-Control", "max-age=31536000, immutable");
	next();
});

router.use(
	express.static(join(home, "public", "misc"))
);

router.use(
	"/static/",
	express.static(join(home, "public", "static"))
);

export default router;