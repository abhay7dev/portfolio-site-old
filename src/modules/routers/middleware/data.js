import { settings, dev } from "../../../config.js";
const { MAIN_DOMAIN, MAIN_HREF } = settings;

import CSP from "../../utils/csp.js";
const cspObj = new CSP();
cspObj.load({
	"upgrade-insecure-requests": [""],
	"default-src": ["none"],
	"style-src": ["none"],
	"style-src-elem": [`${MAIN_HREF}/static/styles/`],
	"style-src-attr": ["none"],
	"font-src": [`${MAIN_HREF}/static/fonts/`],
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
	"script-src-elem": [`${MAIN_HREF}/static/scripts/`],
	"script-src-attr": ["none"],
	"worker-src": [`${MAIN_HREF}/static/scripts/`],
	"form-action": [`${MAIN_HREF}/api/`],
	"base-uri": ["self"],
	"require-trusted-types-for": ["script"]
});
const contentSecurityPolicy = cspObj.share("string");

export default function (req, res, next) {

	res.data = {
		path: req.path,
		hostname: MAIN_DOMAIN,
		mainHref: MAIN_HREF,
		url: `${MAIN_HREF}/${req.originalUrl}`,
		dev
	};
	
	res.set({
		"Content-Security-Policy": contentSecurityPolicy,
		"X-Content-Type-Options": "nosniff",
		"Content-Type": "text/html; charset=UTF-8",
		"Cache-Control": "no-cache",
	});

	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");

	next();
}