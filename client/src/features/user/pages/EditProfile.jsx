// src/features/user/pages/EditProfile.jsx
import React from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EditProfileInfo from "../components/EditProfileInfo";

const mockUser = {
  name: "Umar Ejaz",
  email: "umar@example.com",
  role: "User",
  createdAt: "2024-01-12",
};

const EditProfile = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold ">👤 User Profile</h1>
        <Button className="hover:bg-red-500 cursor-pointer" variant={"ghost"}>
          <Link to={"/user/edit"}>Save Profile</Link>
        </Button>
      </div>

      <EditProfileInfo />
      <ChangePasswordForm />
    </div>
  );
};

export default EditProfile;
