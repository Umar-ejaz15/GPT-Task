// src/features/user/components/ProfileInfo.jsx
import React from "react";

const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
