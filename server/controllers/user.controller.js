// controllers/user.controller.js

import { deleteUserService } from "../service/userServices/user.delete.service.js";
import { updateUserService } from "../service/userServices/user.update.service.js";


export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(req.body);
    res.json(deletedUser);
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(400).json({ message: error.message });
  }
};
