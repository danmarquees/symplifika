import express from "express";
import { generateText } from "../controllers/openaiController.js";

const router = express.Router();

router.post("/generate", generateText);

export default router;
