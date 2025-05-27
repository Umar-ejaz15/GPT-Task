import userModel from "../../models/user.model.js";

export const deleteUserService = async (id) => {
  // Find and delete user by id
  const user = await userModel.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return { message: "User deleted successfully" };
};
