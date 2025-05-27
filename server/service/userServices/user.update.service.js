import userModel from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUserService = async ({ id, name, email, password }) => {
  console.log("Received data:", { id, name, email, password });

  // Validate all fields are present
  if (!id || !name || !email || !password) {
    throw new Error("Please fill all fields");
  }

  // Find existing user by ID
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if email is changing and if the new email is already taken
  if (user.email !== email) {
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      throw new Error("Email already in use");
    }
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user fields
  user.name = name.trim();
  user.email = email.trim();
  user.password = hashedPassword;

  // Save updated user document
  const updatedUser = await user.save();
  return updatedUser;
};
