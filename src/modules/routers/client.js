import express from "express";
const router = express.Router();

import rateLimit from "express-rate-limit";
router.use(
	rateLimit({
		windowMs: 60 * 1000,
		max: 30
	})
);

import { data } from "../misc.js";
router.use(data);

router.get("/", (req, res) => {
	res.render("index", {
		data: res.data
	});
});

export default router;