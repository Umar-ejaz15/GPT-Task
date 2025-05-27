import express from "express";
import {
  addTaskComment,
  getAllTasks,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenthicated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/:id", isAuthenticated, getAllTasks);
router.patch("/:id", isAuthenticated, authorizeRoles("user"), updateTaskStatus);
router.post("/:id/comments", isAuthenticated, addTaskComment);

export default router;
