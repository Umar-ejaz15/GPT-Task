// controllers/adminController.js

import {
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
  assignTaskService,
  getAllTasksForAdminService,
  updateTaskByAdminService,
} from "../service/adminServices/admin.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignTask = async (req, res) => {
  try {
    const task = await assignTaskService(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTasksForAdmin = async (req, res) => {
  try {
    const tasks = await getAllTasksForAdminService();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTaskByAdmin = async (req, res) => {
  try {
    const updatedTask = await updateTaskByAdminService(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
