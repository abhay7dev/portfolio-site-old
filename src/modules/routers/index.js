import clientRouter from "./client.js";
import staticRouter from "./static.js";
import api from "./api/";

import express from "express";
const router = express.Router();

router.use(staticRouter);
router.use("/api", api);
router.use(clientRouter);

export default router;