import express from "express";
import { firebaseLogin } from "../controllers/firebaseAuthController.js";

const router = express.Router();

router.post("/login", firebaseLogin);

export default router;
