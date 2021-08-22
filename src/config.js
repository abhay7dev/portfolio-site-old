import assert from "assert";

const { env } = process;

export const home = new URL("./", import.meta.url).pathname; // Inside src folder

assert(env.NODE_ENV === undefined || env.NODE_ENV === "production" || env.NODE_ENV === "development");

export const NODE_ENV = env.NODE_ENV ?? "development";

export const dev = env.NODE_ENV !== "production";

export const SECRET = env.SECRET;

export const version = 1;

export const errors = {
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
};

export const settings = Object.freeze({
	PORT: env.PORT || 5050,
	HREFS: Object.freeze([... new Set([
		"https://abhay7.is-a.dev",
		"https://" + (env.REPL_SLUG === env.REPL_OWNER ? `${env.REPL_OWNER}.repl.co` : `${env.REPL_SLUG}.${env.REPL_OWNER}.repl.co`),
	].map(href => href.toLowerCase()))]),
	get REDIRECTS() {
		return Object.freeze([
			`https://${env.REPL_OWNER}.repl.co`,
			`https://${env.REPL_OWNER}.github.io`
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
	CLIENT_SECRET: env.GITHUB_CLIENT_SECRET
});