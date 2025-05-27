import React from "react";
import { Link } from "react-router-dom"; // or next/link if using Next.js

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🔧 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="👥 Manage Users" link="/admin/users" />
        <Card title="📝 Manage Tasks" link="/admin/tasks" />
        <Card title="💬 Manage Comments" link="/admin/comments" />
        <Card title="📊 View Analytics" link="/admin/analytics" />
        <Card title="👑 Create New Admin" link="/admin/create-admin" />
        <Card title="⚙️ Settings" link="/admin/settings" />
      </div>
    </div>
  );
};

const Card = ({ title, link }) => (
  <Link
    to={link}
    className="bg-zinc-800 p-6 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg"
  >
    <h2 className="text-xl font-semibold">{title}</h2>
  </Link>
);

export default AdminPage;
