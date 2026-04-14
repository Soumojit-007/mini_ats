import express from "express";
import multer from "multer";
import { matchResume } from "../controllers/matchController.js";

const router = express.Router();

// file upload config
const upload = multer({ dest: "uploads/" });

// POST /api/match
router.post("/match", upload.single("resume"), matchResume);

export default router;