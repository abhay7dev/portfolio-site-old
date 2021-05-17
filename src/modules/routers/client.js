import express from "express";
const router = express.Router();

import rateLimit from "express-rate-limit";
router.use(
	rateLimit({
		windowMs: 60 * 1000,
		max: 30,
	})
);

import { data } from "../misc.js";
router.use(data);

router.get("/", (req, res) => {
	res.render("index", {
		data: res.data,
	});
});

router.get("/offline", (req, res) => {
	res.render("offline", {
		data: res.data
	});
});

router.get("/projects", (req, res) => {
	res.data.projects = [
		{
			name: "Project-1",
			description: "A random description",
			link: "https://example.com",
		},
		{
			name: "Project-2",
			description: "Lorem ipsum",
			link: "https://example.com",
		},
		{
			name: "Project-3",
			description: "dolor sit amet",
			link: "https://example.com",
		},
		{
			name: "Project-4",
			description: "what comes next",
			link: "https://example.com",
		},
		{
			name: "Project-5",
			description: "idkh help",
			link: "https://example.com",
		},
		{
			name: "Project-6",
			description: "sigh",
			link: "https://example.com",
		},
	];
	res.render("projects", {
		data: res.data,
	});
});

router.get("/blog", (req, res) => {
	res.send("blogs");
});

router.get("/blog/:id", (req, res) => {
	res.send(req.params.id);
});

router.get("/contact", (req, res) => {
	res.render("contact", {
		data: res.data,
	});
});

export default router;
