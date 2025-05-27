// src/features/user/pages/UserProfile.jsx
import React from "react";
import ProfileInfo from "../components/ProfileInfo";
import AccountActivity from "../components/AccountActivity";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const mockUser = {
  name: "Umar Ejaz",
  email: "umar@example.com",
  role: "User",
  createdAt: "2024-01-12",
};

const mockLogs = [
  { message: "Logged in", date: "2025-05-24T10:00:00Z" },
  { message: "Updated profile", date: "2025-05-22T15:30:00Z" },
];

const UserProfile = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold ">👤 User Profile</h1>
        <Button
          className="hover:bg-red-500 cursor-pointer"
          variant={"destructive"}
        >
          <Link to={"/user/edit"}>Edit Profile</Link>
        </Button>
      </div>

      <ProfileInfo user={mockUser} />
      <AccountActivity logs={mockLogs} />
      <Button className="w-full mt-8 cursor-pointer ">
        <Link to={"/taskdashboard"}>View My Tasks</Link>
      </Button>
    </div>
  );
};

export default UserProfile;
