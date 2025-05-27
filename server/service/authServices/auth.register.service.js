// services/user.service.js

import userModel from "../../models/user.model.js";
import { generateToken } from "../../utils/token.js";

export const registerUserService = async ({ name, email, password }) => {

  if (!name || !email || !password) {
    throw new Error("Please fill all fields");

  }


  // Directly find user by email using Mongoose
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Create user directly using Mongoose model
  const user = await userModel.create({ name, email, password });
  console.log("User created:", user);
  
  const token = generateToken(user._id);

  return { _id: user._id, name: user.name, email: user.email, token };
};
