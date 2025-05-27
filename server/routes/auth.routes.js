import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenthicated.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected logout route (requires valid token)
router.post("/logout", isAuthenticated, logoutUser);

export default router;
