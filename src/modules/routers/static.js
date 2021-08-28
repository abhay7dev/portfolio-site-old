import express from "express";
const router = express.Router();
import { home } from "../../config.js";
import { join } from "path";

import minify from "express-minify";

import statheaders from "./middleware/statheaders.js";

router.use(statheaders);
router.use(minify());

router.use(
	express.static(join(home, "public", "root"))
);

router.use(
	"/static/",
	express.static(join(home, "public", "static"))
);

export default router;