import { loginUserService } from "../service/authServices/auth.login.service.js";
import { logoutUserService } from "../service/authServices/auth.logout.service.js";
import { registerUserService } from "../service/authServices/auth.register.service.js";

export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    console.log(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // change to true in production (with HTTPS)
      sameSite: "Lax",
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    console.log("Login result:", result); // Add this

    if (!result) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (result.role === "admin") {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: result._id,
          name: result.name,
          role: result.role,
          email: result.email,
        },
      });
    }

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: result._id,
        name: result.name,
        role: result.role,
        email: result.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await logoutUserService(); // You can remove this if it's empty
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
