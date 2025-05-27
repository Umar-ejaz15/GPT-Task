// src/features/user/components/ChangePasswordForm.jsx
import React, { useState } from "react";

const ChangePasswordForm = () => {
  const [form, setForm] = useState({ current: "", new: "", confirm: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  dark:bg-zinc-900 text-black dark:text-white  shadow-md rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <div className="space-y-4">
        <input
          type="password"
          name="current"
          placeholder="Current Password"
          value={form.current}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="new"
          placeholder="New Password"
          value={form.new}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
