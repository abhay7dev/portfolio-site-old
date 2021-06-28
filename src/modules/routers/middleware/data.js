import { settings, dev, version } from "../../../config.js";
const { MAIN_DOMAIN, MAIN_HREF } = settings;

import { randomBytes } from "crypto";

export default function (req, res, next) {
	const nonce = randomBytes(16).toString("base64");

	const csp = `
		upgrade-insecure-requests;
		default-src 'none';
		child-src 'none';
		frame-src 'none';
		frame-ancestors 'none';
		media-src 'none';
		base-uri 'none';
		object-src 'none';
		prefetch-src 'none';
		manifest-src 'self';
		img-src 'self';
		connect-src *;
		font-src ${MAIN_HREF}/static/fonts/;
		style-src 'nonce-${nonce}';
		style-src ${MAIN_HREF}/static/styles/;
		style-src-elem 'nonce-${nonce}';
		style-src-elem ${MAIN_HREF}/static/styles/;
		style-src-attr 'none';
		script-src 'nonce-${nonce}';
		script-src ${MAIN_HREF}/static/scripts/;
		script-src-elem 'nonce-${nonce}';
		script-src-elem ${MAIN_HREF}/static/scripts/;
		script-src-attr 'none';
		worker-src ${MAIN_HREF}/static/scripts/;
		form-action ${MAIN_HREF}/api/;
	`.replace(/\s/g, " ");

	res.data = {
		href: MAIN_HREF,
		url: `${MAIN_HREF}${req.path}`,
		year: new Date().getFullYear(),
		version: `${dev ? "dev-" : ""}${version}`,
		nonce,
		dev
	};
	
	res.set({
		"Content-Security-Policy": csp,
		"X-Content-Type-Options": "nosniff",
		"Content-Type": "text/html; charset=utf-8",
		"Cache-Control": "no-cache",
	});

	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");

	next();
}