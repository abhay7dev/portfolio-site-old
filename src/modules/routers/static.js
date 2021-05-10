import express from "express";
const router = express.Router();
import { home } from "../../config.js";
import { join } from "path";

router.use(
	"/static/",
	express.static(join(home, "public"), {
		setHeaders: (res, path) => {
			res.removeHeader("X-Powered-By");
			res.removeHeader("X-Frame-Options");
			res.removeHeader("x-frame-options");
			res.removeHeader("content-security-policy");
			res.removeHeader("Content-Security-Policy");
			res.set("x-content-type-options", "nosniff");
			res.set("Cache-Control", "immutable, max-age=31536000");
			if (path.indexOf("sw.js") !== -1) {
				res.set("Service-Worker-Allowed", "../../");
			}
		},
	})
);

router.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("x-frame-options");
	res.removeHeader("content-security-policy");
	res.removeHeader("Content-Security-Policy");
	res.set("Cache-Control", "immutable, max-age=31536000");
	next();
});

router.get("/robots.txt", (req, res) => {
	res.sendFile(join(home, "public", "misc", "robots.txt"));
});

router.get("/manifest.webmanifest", (req, res) => {
	res.sendFile(join(home, "public", "misc", "manifest.webmanifest"));
});

router.get("/favicon.ico", (req, res) => {
	res.sendFile(join(home, "public", "images", "favicon.ico"));
});

export default router;
