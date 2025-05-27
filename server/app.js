import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import createDefaultAdmin from "./configs/default-admin.js";

mongoose.connection.once("open", async () => {
  console.log("🟢 MongoDB connected admin created");
  await createDefaultAdmin();
});

dotenv.config();

import connectDB from "./configs/db-connection.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import taskRoutes from "./routes/task.routes.js";
import mongoose from "mongoose";

const app = express();
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend origin
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/task", taskRoutes);


app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
