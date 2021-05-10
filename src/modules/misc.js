import { serverSettings } from "../config.js";

const { hrefs } = serverSettings;

const cspHeaders = `
	upgrade-insecure-requests;
	default-src 'self';
	style-src 'none';
	style-src-elem ${hrefs("/static/styles/")} https://fonts.googleapis.com/css2;
	style-src-attr 'none';
	font-src ${hrefs("/static/fonts/")} https://fonts.gstatic.com;
	child-src 'none';
	connect-src *;
	frame-src 'none';
	manifest-src 'self';
	frame-ancestors 'none';
	img-src 'self';
	media-src 'none';
	object-src 'none';
	prefetch-src 'none';
	script-src 'none';
	script-src-elem ${hrefs("/static/scripts/")};
	script-src-attr 'none';
	worker-src ${hrefs("/static/scripts/")}';
	navigate-to 'self';
	`.replace(/\s/g, " ");

export function data(req, res, next) {
	res.set({
		"Content-Security-Policy": cspHeaders,
		"x-content-type-options": "nosniff",
		"Content-type": "text/html; charset=UTF-8",
		"Cache-Control": "no-store, max-age=0",
	});

	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("x-frame-options");

	res.data = {
		path: req.path,
	};

	next();
}
