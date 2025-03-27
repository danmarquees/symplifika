import express from "express";
const router = express.Router();
import { syncData, getLastSync } from "../controllers/syncController.js"; // Certifique-se de criar o controller
import { verifyToken } from "../middleware/authMiddleware.js";

router.post("/", verifyToken, syncData);
router.get("/last", verifyToken, getLastSync);

export default router;
