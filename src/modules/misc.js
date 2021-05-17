import { serverSettings } from "../config.js";
const { hrefs, MAIN_DOMAIN, MAIN_HREF } = serverSettings;

import CSP from "./csp.js";
const csp = new CSP();

export function data(req, res, next) {

	res.data = {
		path: req.path,
		hostname: req.hostname,
		mainDomain: MAIN_DOMAIN,
		mainHref: MAIN_HREF,
		removeStyle: (serverSettings.noStyles.indexOf(req.path) !== -1 ? true : false)
	};

	const rawCSP = {
		"upgrade-insecure-requests": [""],
		"default-src": ["self"],
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
		"navigate-to": ["self"]
	};

	if(serverSettings.inlineAllowed.indexOf(req.path) !== -1) {
		rawCSP["style-src-elem"].push("sha256-T6S3HvoS/88a5vDvysxQr4kumGeyZ+Ia2ZIYKdW5JX4=");
		rawCSP["script-src-elem"].push("sha256-oC4P6m6M27ydSg8/N2A2UgKNTJQZk+fyWcoeQx3YfDw=");
	}

	csp.load(rawCSP);

	res.set({
		"Content-Security-Policy": csp.share("string"),
		"x-content-type-options": "nosniff",
		"Content-type": "text/html; charset=UTF-8",
		"Cache-Control": "no-store, max-age=0",
	});

	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("x-frame-options");

	next();
}