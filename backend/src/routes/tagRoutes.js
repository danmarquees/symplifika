import express from "express";
const router = express.Router();
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/tagController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.get("/", verifyToken, getAllTags);
router.get("/:id", verifyToken, getTagById);
router.post("/", verifyToken, createTag);
router.put("/:id", verifyToken, updateTag);
router.delete("/:id", verifyToken, deleteTag);

export default router;
