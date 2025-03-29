import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import csrf from "csurf";
// Import the validation middleware
import { validateRegister } from "../middleware/validationMiddleware.js";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });
router.post("/register", validateRegister, register); // Aplicar validateRegister aqui
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
