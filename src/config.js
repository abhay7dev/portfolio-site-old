import assert from "assert";
const { env } = process;

export const home = new URL("./", import.meta.url).pathname; // Inside src folder

assert(env.NODE_ENV === undefined || env.NODE_ENV === "production" || env.NODE_ENV === "development");
export const NODE_ENV = env.NODE_ENV || "development";
export const dev = env.NODE_ENV !== "production";

export const SECRET = env.SECRET;

export const version = 1;

export const errors = Object.freeze({
	403: {
		errorType: "403 Forbidden",
		errorMessage: "Access to the requested resource is prohibited.",
	},
	404: {
		errorType: "404 Not found",
		errorMessage: "The requested resource was not found by the server. You may have stumbled across a dead or unused hyperlink.",
	},
	405: {
		errorType: "405 Method not allowed",
		errorMessage: "The requested resource was requested incorrectly.",
	},
	429: {
		errorType: "429 Too Many Requests",
		errorMessage: "Too many requests has come from this device, please try again later.",
	},
	500: {
		errorType: "500 Internal server error",
		errorMessage: "The server could not handle the request which caused an error in returning the resource.",
	},
	unsupported: {
		errorType: "Unsupported Browser Error",
		errorMessage: "Your Browser does not properly display this website, therefore accessing the site is prohibited.",
	}
});

export const settings = Object.freeze({
	PORT: env.PORT || 5050,
	HREFS: Object.freeze([... new Set([
		"https://abhay7.is-a.dev",
		"https://" + (env.REPL_SLUG === env.REPL_OWNER ? `${env.REPL_OWNER}.repl.co` : `${env.REPL_SLUG}.${env.REPL_OWNER}.repl.co`),
	].map(href => href.toLowerCase()))]),
	get REDIRECTS() {
		return Object.freeze([
			`https://${env.REPL_OWNER}.repl.co`,
			`https://${env.REPL_OWNER}.github.io`,
			`https://abhay.thedev.id`
		].map(href => href.toLowerCase()));
	},
	get MAIN_HREF() {
		return this.HREFS[0];
	},
	get MAIN_DOMAIN() {
		return this.HREFS[0].substring("https://".length, this.HREFS[0].length);
	}
});

export const github = Object.freeze({
	CLIENT_ID: env.GITHUB_CLIENT_ID,
	CLIENT_SECRET: env.GITHUB_CLIENT_SECRET,
	ADMIN_ID: env.ADMIN_ID
});

export const halo = Object.freeze({
	CRYPTUM_TOKEN: env.CRYPTUM_TOKEN,
	USER_ID: env.HALO_USER_ID
});

export const csp = `
		upgrade-insecure-requests;
		default-src 'none';
		child-src 'none';
		frame-src 'none';
		frame-ancestors 'none';
		media-src 'self' https://cryptum.halodotapi.com/games/hmcc/media/clips/ *.xboxlive.com;
		base-uri 'none';
		object-src 'none';
		prefetch-src 'none';
		manifest-src 'self';
		img-src 'self' https://emblems.svc.halowaypoint.com/hmcc/emblems/ *.xboxlive.com;
		connect-src 'self';
		font-src ${settings.MAIN_HREF}/static/fonts/;
		style-src ${settings.MAIN_HREF}/static/styles/;
		style-src-elem ${settings.MAIN_HREF}/static/styles/;
		style-src-attr 'none';
		script-src ${settings.MAIN_HREF}/static/scripts/;
		script-src-elem ${settings.MAIN_HREF}/static/scripts/;
		script-src-attr 'none';
		worker-src ${settings.MAIN_HREF}/static/scripts/;
		form-action ${settings.MAIN_HREF}/api/;
	`.replace(/\s/g, " ");