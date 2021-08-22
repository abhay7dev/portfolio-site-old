import clientRouter from "./client.js";
import staticRouter from "./static.js";
import api from "./api.js";

import express from "express";
const router = express.Router();

router.use(staticRouter);
router.use(clientRouter);
router.use("/api", api);

export default router;