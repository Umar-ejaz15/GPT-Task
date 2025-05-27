// services/taskService.js

import taskModel from "../../models/task.model.js";

export const getAllTasksService = async () => {
  return await taskModel.find();
};

// services/task.service.js
export const getTasksByUserIdService = async (userId) => {
  console.log(userId);
  
  return await taskModel
    .find({ assignedTo: userId })
    .populate("assignedTo", "-password");
};

export const updateTaskStatusService = async (taskId, updateData) => {
  return await taskModel.findByIdAndUpdate(taskId, updateData, { new: true });
};

export const addTaskCommentService = async (taskId, comment) => {
  return await taskModel.findByIdAndUpdate(
    taskId,
    { $push: { comments: comment } },
    { new: true }
  );
};
