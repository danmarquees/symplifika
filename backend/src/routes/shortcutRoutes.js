import express from "express";
const router = express.Router();
import {
  getAllShortcuts,
  getShortcutById,
  createShortcut,
  updateShortcut,
  deleteShortcut,
} from "../controllers/shortcutController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { validateShortcut } from "../middleware/validationMiddleware.js";

router.get("/", verifyToken, getAllShortcuts);
router.get("/:id", verifyToken, getShortcutById);
router.post("/", verifyToken, validateShortcut, createShortcut); // Added validateShortcut
router.put("/:id", verifyToken, validateShortcut, updateShortcut); // Added validateShortcut
router.delete("/:id", verifyToken, deleteShortcut);

export default router;
