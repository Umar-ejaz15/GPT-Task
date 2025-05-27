import express from "express";
import {
  assignTask,
  deleteUser,
  getAllTasksForAdmin,
  getAllUsers,
  getUserById,
  updateTaskByAdmin,
} from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenthicated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

// All routes below are protected and admin-only
router.use(isAuthenticated, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);

router.post("/task/assign", assignTask);
router.get("/task", getAllTasksForAdmin);
router.get("/task/:id", updateTaskByAdmin);

export default router;
