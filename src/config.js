const { env } = process;

export const home = new URL("./", import.meta.url).pathname;

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
		this.REPL_SLUG = env.REPL_SLUG;
		this.REPL_OWNER = env.REPL_OWNER;
		this.PORT = env.PORT || 5050;
		this.DOMAINS = [
			"abhay7.is-a.dev",
			"EpicGamer007.repl.co",
			"26ece53e-5ca7-40d2-a7ad-cc13eb22808d.id.repl.co",
		];
		this.MAIN_DOMAIN = this.DOMAINS[0];
		this.MAIN_HREF = `https://${this.DOMAINS[0]}`;
		this.hrefs = (add = "", str = true) => {
			if(str) {
				let str = "";

				for (let i = 0; i < this.DOMAINS.length - 1; i++) {
					str += `https://${this.DOMAINS[i]}${add} `;
				}
				str += `https://${this.DOMAINS[this.DOMAINS.length - 1]}${add}`;

				return str;
			} else {
				const arr = [];

				for (let i = 0; i < this.DOMAINS.length; i++) {
					arr.push(`https://${this.DOMAINS[i]}${add}`);
				}

				return arr;
			}
		};
		this.domains = (add = "", str = true) => {
			if(str) {
				let str = "";

				for (let i = 0; i < this.DOMAINS.length - 1; i++) {
					str += `${this.DOMAINS[i]}${add} `;
				}
				str += `${this.DOMAINS[this.DOMAINS.length - 1]}${add}`;

				return str;
			} else {
				const arr = [];

				for (let i = 0; i < this.DOMAINS.length; i++) {
					arr.push(`${this.DOMAINS[i]}${add}`);
				}

				return arr;
			}
		};
	}
})();
