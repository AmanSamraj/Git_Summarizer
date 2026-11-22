
import express from "express";

import { checkHealth } from "../controllers/health.controller.js";

const router = express.Router();

// GET API to check backend health
router.get("/", checkHealth);

export default router;
