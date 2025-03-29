import express from "express";
const router = express.Router();
import {
  getAllShortcuts,
  getShortcutById,
  createShortcut,
  updateShortcut,
  deleteShortcut,
} from "../controllers/shortcutController.js";
import { verifyToken, protect } from "../middleware/authMiddleware.js";
import { validateShortcut } from "../middleware/validationMiddleware.js";

router.get("/", protect, getAllShortcuts);
router.get("/:id", protect, getShortcutById);
router.post("/", protect, validateShortcut, createShortcut);
router.put("/:id", protect, validateShortcut, updateShortcut);
router.delete("/:id", protect, deleteShortcut);

export default router;
