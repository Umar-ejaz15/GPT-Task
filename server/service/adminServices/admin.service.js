// services/adminService.js

import taskModel from "../../models/task.model.js";
import userModel from "../../models/user.model.js";

export const getAllUsersService = async () => {
  return await userModel.find();
};

export const getUserByIdService = async (id) => {
  return await userModel.findById(id);
};

export const deleteUserService = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
export const assignTaskService = async (taskData) => {
  const { assignedToEmail, ...rest } = taskData;

  const user = await userModel.findOne({ email: assignedToEmail });

  if (!user) {
    throw new Error("User with the provided email not found.");
  }

  const task = new taskModel({
    ...rest,
    assignedTo: user._id,
  });

  return await task.save();
};

export const getAllTasksForAdminService = async () => {
  return await taskModel.find().populate("assignedTo createdBy");
};

export const updateTaskByAdminService = async (taskId, updateData) => {
  return await taskModel.findByIdAndUpdate(taskId, updateData, { new: true });
};
