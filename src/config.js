const { env } = process;

export const home = new URL("./", import.meta.url).pathname;

export const serverSettings = {
	REPL_SLUG: env.REPL_SLUG,
	REPL_OWNER: env.REPL_OWNER,
	PORT: env.PORT || 5050,
	HREF: `https://${
		env.REPL_SLUG == env.REPL_OWNER
			? `${env.REPL_OWNER}.repl.co`
			: `${env.REPL_SLUG}.${env.REPL_OWNER}.repl.co`
	}`,
	DOMAIN: `${
		env.REPL_SLUG == env.REPL_OWNER
			? `${env.REPL_SLUG}.repl.co`
			: `${env.REPL_SLUG}.${env.OWNER}.repl.co`
	}`,
};

export const errors = {
	403: {
		errorType: "403 Forbidden",
		errorMessage: "Access to the requested resource is prohibited.",
	},
	404: {
		errorType: "404 Not found",
		errorMessage:
			"The requested resource was not found by the server. You may have stumbled across a dead or unused hyperlink.",
	},
	405: {
		errorType: "405 Method not allowed",
		errorMessage: "The requested resource was requested incorrectly",
	},
	500: {
		errorType: "500 Internal server error",
		errorMessage:
			"The server could not handle the request which caused an error in returning the resource",
	},
};
