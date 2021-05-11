import express from "express";
const router = express.Router();
import { home } from "../../config.js";
import { join } from "path";

router.use((req, res, next) => {
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

export default router;
