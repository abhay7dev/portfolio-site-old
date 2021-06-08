const { env } = process;

export const home = new URL("./", import.meta.url).pathname;

export const dev = process.argv[process.argv.length - 1] === "dev";

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

export const serverSettings = new (class {
	constructor() {
		this.PORT = env.PORT || 5050;

		this.DOMAINS = Object.freeze([
			"abhay7.is-a.dev",
			env.REPL_SLUG === env.REPL_OWNER ? `${env.REPL_OWNER}.repl.co` : `${env.REPL_SLUG}.${env.REPL_OWNER}.repl.co`,
			`${env.REPL_ID}.id.repl.co`,
		]);
		this.MAIN_DOMAIN = this.DOMAINS[0];
		this.MAIN_HREF = `https://${this.DOMAINS[0]}`;

		this.locations = (options = {}) => {

			const ops = {
				add: "",
				href: "https://"
			}

			Object.keys(options).forEach(key => {
				if(
					ops.hasOwnProperty(key) &&
					typeof ops[key] === typeof options[key]
				) {
					ops[key] = options[key];
				}
			});

			const locs = [];

			for (let i = 0; i < this.DOMAINS.length; i++) {
				locs.push(ops.href + this.DOMAINS[i] + ops.add);
			}

			return locs;

		};
	}
})();
