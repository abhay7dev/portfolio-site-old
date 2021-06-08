import { serverSettings, dev } from "../../../config.js";
const { locations, MAIN_DOMAIN, MAIN_HREF } = serverSettings;

import CSP from "../../utils/csp.js";
const cspObj = new CSP();
cspObj.load({
	"upgrade-insecure-requests": [""],
	"default-src": ["none"],
	"style-src": ["none"],
	"style-src-elem": locations({add: "/static/styles/"}),
	"style-src-attr": ["none"],
	"font-src": locations({add: "/static/fonts/"}),
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
	"script-src-elem": locations({add: "/static/scripts/"}),
	"script-src-attr": ["none"],
	"worker-src": locations({add: "/static/scripts/"}),
	"navigate-to": ["self"],
	"form-action": locations({add: "/api/"}),
	"base-uri": ["self"]
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