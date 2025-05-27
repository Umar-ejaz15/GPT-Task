
import userModel from "../models/user.model.js";

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await userModel.findOne({ role: "admin" });

    if (!existingAdmin) {
      await userModel.create({
        name: "Admin",
        email: "admin@admin.com",
        password: "admin123",
        role: "admin",
      });

      console.log("✅ Default admin created.");
    } else {
      console.log("✅ Admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error.message);
  }
};

export default createDefaultAdmin;
