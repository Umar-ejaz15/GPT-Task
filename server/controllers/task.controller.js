// controllers/taskController.js

import {
  updateTaskStatusService,
  addTaskCommentService,
  getTasksByUserIdService,
} from "../service/taskServices/task.service.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUserIdService(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; // task ID
    const { status } = req.body;
    console.log(id,status);
    
  

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required." });
    }

    const updatedTask = await updateTaskStatusService(id, { status });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating task status.",
    });
  }
};
export const addTaskComment = async (req, res) => {
  try {
    const task = await addTaskCommentService(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
