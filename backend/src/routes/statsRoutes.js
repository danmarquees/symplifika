import express from "express";
const router = express.Router();
import { getStats } from "../controllers/statsController.js"; // Importe o controller
import { verifyToken } from "../middleware/authMiddleware.js";

router.get("/", verifyToken, getStats); // Rota para obter as estatísticas

export default router;
