import express from "express";
const router = express.Router();
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.get("/", verifyToken, getAllCategories);
router.get("/:id", verifyToken, getCategoryById);
router.post("/", verifyToken, createCategory);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

export default router;
