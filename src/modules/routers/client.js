import express from "express";
const router = express.Router();

import { errors, dev, csp, github } from "../../config.js";

import data from "./middleware/data.js";
router.use(data);

import rateLimit from "express-rate-limit";
router.use(
	rateLimit({
		windowMs: (dev ? 1 : 60) * 1000,
		max: 30,
		handler: (req, res) => {
			res.data.error = errors[429]
			res.render("error", {
				data: res.data
			});
		}
	})
);

router.use((req, res, next) => {
	
	res._render = res.render;
	res.render = (page) => res._render(page, { data: res.data});

	next();
});

router.get("/", (req, res) => {
	
	// console.log(req.session.username, req.session.access_token, req.session.id, req.session.isAdmin);

	res.render("index");
});

router.get("/about", (req, res) => {
	res.render("about");
});

router.get("/projects", (req, res) => {
	res.data.projects = [];
	res.render("projects");
});

router.get("/blog", (req, res) => {
	res.data.blogs = [];
	res.render("blog");
});

router.get("/contact", (req, res) => {
	res.render("contact");
});

router.get("/halo", async (req, res) => {
	res.render("halo");
});

router.get("/halo/:id", async (req, res) => {
	if(!req.params.id) return res.redirect("/halo");
	res.data.id = req.params.id;
	res.render("watch");
});

router.get("/admin", (req, res, next) => {
	if(req.session.isAdmin) {
		res.render("admin");
	} else {
		next();
	}
});

router.get("/discord", (req, res) => {
	res.redirect("https://discord.gg/zDbbjKmZXy");
});

router.get("/login", (req, res) => {
	if(req.session.username) return res.redirect("/");
	const stateString = Math.random().toString(20).substr(2, 16);
	global.stateCache.push(stateString);
	res.redirect(`https://github.com/login/oauth/authorize?client_id=${github.CLIENT_ID}&state=${stateString}&allow_signup=false`);
});

router.post("/logout", (req, res) => {
	req.session = null;
	res.end();
});

export default router;