import { settings, dev, version, csp } from "../../../config.js";
const { MAIN_HREF } = settings;

export default function (req, res, next) {

	res.data = {
		href: MAIN_HREF,
		url: `${MAIN_HREF}${req.path}`,
		year: new Date().getFullYear(),
		version: `${dev ? "dev-" : ""}${version}`,
		loggedIn: req.session.username && req.session.access_token && req.session.id,
		isAdmin: req.session.isAdmin,
		dev
	};
	
	res.set({
		"Content-Security-Policy": csp,
		"X-Content-Type-Options": "nosniff",
		"Content-Type": "text/html; charset=utf-8",
		"Cache-Control": "no-cache",
	});

	res.removeHeader("X-Frame-Options");

	next();
}