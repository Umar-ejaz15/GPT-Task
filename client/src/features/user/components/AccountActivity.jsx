// src/features/user/components/AccountActivity.jsx
import React from "react";

const AccountActivity = ({ logs }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="list-disc list-inside space-y-2">
        {logs.map((log, index) => (
          <li key={index}>
            {log.message} — <span className="text-gray-500 text-sm">{new Date(log.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountActivity;
