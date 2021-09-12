import express from "express";
const router = express.Router();

import haloAPI from "./halo.js";
import githubRouter from "./github.js";

router.use("/halo", haloAPI);
router.use("/github", githubRouter);

export default router;