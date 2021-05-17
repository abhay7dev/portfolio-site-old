import express from "express";
const app = express();
import layouts from "express-ejs-layouts";

import { createServer } from "http";
const server = createServer(app);

import helmet from "helmet";

import routers from "./modules/routers.js";

import { serverSettings as config, home, errors } from "./config.js";
import { join } from "path";

app.set("view engine", "ejs");
app.set("views", join(home, "views"));
app.set("layout extractScripts", true);
app.set("layout extractMetas", true);
app.set("layout extractStyles", true);

app.use(helmet({ xssFilter: false }));
app.use(layouts);

app.use((req, res, next) => {
	// console.log(`Requested: ${req.hostname.toLowerCase()}\nMAIN_DOMAIN: ${config.MAIN_DOMAIN.toLowerCase()}`);
	if(req.hostname.toLowerCase() !== config.MAIN_DOMAIN.toLowerCase()) {
		return res.redirect(`${config.MAIN_HREF}/${req.path}`);
	}
	return next();
});

app.use(routers.staticRouter);
app.use(routers.clientRouter);

app.use((req, res) => {
	res.data.error = errors[404];
	res.render("error", {
		data: res.data,
	});
});

server.listen(config.PORT, () => {
	console.log(
		"\nlistening on port %s at %s starting at %s UTC time",
		config.PORT,
		config.hrefs(),
		new Date().toLocaleString()
	);
});
