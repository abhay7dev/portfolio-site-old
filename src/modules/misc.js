import { serverSettings } from "../config.js";
const { hrefs, MAIN_DOMAIN, MAIN_HREF } = serverSettings;

import CSP from "./data/csp.js";
const csp = new CSP();

export function data(req, res, next) {

	res.data = {
		path: req.path,
		hostname: req.hostname,
		mainHref: MAIN_HREF,
		fullUrl: `https://${req.headers.host}${req.originalUrl}`,
		fullUrlNoQuery: `https://${req.headers.host}${req.baseUrl}${req.path}`
	};

	const raw = {
		"upgrade-insecure-requests": [""],
		"default-src": ["none"],
		"style-src": ["none"],
		"style-src-elem": hrefs("/static/styles/", false),
		"style-src-attr": ["none"],
		"font-src": hrefs("/static/fonts/", false),
		"child-src": ["none"],
		"connect-src": ["*"],
		"frame-src": ["none"],
		"manifest-src": ["self"],
		"frame-ancestors": ["none"],
		"img-src": ["self"],
		"media-src": ["none"],
		"object-src": ["none"],
		"prefetch-src": ["none"],
		"script-src": ["none"],
		"script-src-elem": hrefs("/static/scripts/", false),
		"script-src-attr": ["none"],
		"worker-src": hrefs("/static/scripts/", false),
		"navigate-to": ["self"],
		"form-action": hrefs("/api/", false),
		"base-uri": ["self"]
	};

	csp.load(raw);

	res.set({
		"Content-Security-Policy": csp.share("string"),
		"x-content-type-options": "nosniff",
		"Content-Type": "text/html; charset=UTF-8",
		"Cache-Control": "no-cache",
	});

	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("x-frame-options");

	next();
}