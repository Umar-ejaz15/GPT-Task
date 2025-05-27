import userModel from "../../models/user.model.js";
import { generateToken } from "../../utils/token.js";

export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Please fill all fields");
  }
  

  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid credentials");
  }
  console.log("User found:", user.email);
  const passwordMatch = await user.matchPassword(password);
  console.log("Password match:", passwordMatch);
  if (!user || !passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ id: user._id, role: user.role });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,

    token,
  };
};
