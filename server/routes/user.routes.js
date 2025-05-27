import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenthicated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Update own user info
router.patch("/update", isAuthenticated, updateUser);


// Admin deletes any user (ID should be in req.body or req.query)
router.delete("/delete", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;
