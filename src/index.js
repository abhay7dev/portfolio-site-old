import express from "express";
const app = express();
import { createServer } from "http";
const server = createServer(app);

import layouts from "express-ejs-layouts";
import helmet from "helmet";
import session from "cookie-session";
import compression from "compression";

import router from "./modules/routers/";

import {
	settings as config,
	home,
	errors,
	SECRET,
	version,
	NODE_ENV
} from "./config.js";
import { join } from "path";

app.set("view engine", "ejs");
app.set("env", NODE_ENV);
app.set("json spaces", 4);
app.set("x-powered-by", false);

app.set("views", join(home, "views"));

app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);

import StateArray from "./modules/misc/StateArray.js";
global.stateCache = new StateArray();

app.use((req, res, next) => {
	if(req.hostname.toLowerCase() !== config.MAIN_DOMAIN) {
		return res.redirect(`${config.MAIN_HREF}${req.originalUrl}`);
	}
	next();
});

app.use(helmet({
	xssFilter: false, 	
	contentSecurityPolicy: false
}));
app.use(session({
	name: "session",
	secret: SECRET,
	maxAge: 1000 * 60 * 60 * 24 * 28,
}));

if(app.get("env") === "production") {
	app.use(compression());
}

app.use(layouts);
app.use(router);

app.use((req, res) => {
	res.data.error = errors[404];
	res.status(404).render("error", {
		data: res.data,
	});
});

server.listen(config.PORT, () => {
	console.log(
		"Listening on port %s at \n\t%s\nWith redirects from\n\t%s\nStarting at %s pacific time\nRunning '%s' version '%s'",
		config.PORT,
		config.HREFS.join("\n\t"),
		config.REDIRECTS.join("\n\t"),
		new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}),
		NODE_ENV,
		version
	);
});