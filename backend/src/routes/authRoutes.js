const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.post("/logout", verifyToken, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
