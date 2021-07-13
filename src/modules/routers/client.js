import express from "express";
const router = express.Router();

import { errors, dev } from "../../config.js";

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

router.get("/", (req, res) => {
	res.render("index", {
		data: res.data,
	});
});

router.get("/about", (req, res) => {
	res.render("about", {
		data: res.data
	});
});

router.get("/projects", (req, res) => {
	res.data.projects = [];
	res.render("projects", {
		data: res.data,
	});
});

router.get("/blog", (req, res) => {
	res.data.blogs = [];
	res.render("blog", {
		data: res.data,
	});
});

router.get("/contact", (req, res) => {
	res.render("contact", {
		data: res.data,
	});
});

export default router;
