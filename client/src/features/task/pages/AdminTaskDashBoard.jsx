import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TaskForm from "../components/TaskForm";
import UserManage from "../components/UserManage";
import { GetTask } from "@/services/task-by-admin";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminTaskDashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
    setShowUserManagement(false);
  };

  const toggleUserManagement = () => {
    setShowUserManagement(!showUserManagement);
    setShowTaskForm(false);
  };

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: GetTask,
    refetchInterval: 10000, // Auto refetch every 10 seconds
    refetchOnWindowFocus: true, // Also refetch on window focus
  });

  useEffect(() => {
    if (tasksData) {
      setTasks(
        tasksData.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
        }))
      );
    }
  }, [tasksData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Task Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={toggleTaskForm}>Add Task</Button>
        <Button onClick={toggleUserManagement}>Manage Users</Button>
      </div>

      {showTaskForm && <TaskForm />}
      {showUserManagement && <UserManage />}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {tasks.map((task, index) => (
          <Link
          to={`/admin/dashboard/task/${task._id}`}
            key={index}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-5 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                {task.title}
              </h3>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500 text-white">
                {task.status}
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
              {task.description}
            </p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500 text-white">
                Priority: {task.priority}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Due:{" "}
                {task.dueDate instanceof Date
                  ? task.dueDate.toDateString()
                  : "N/A"}
              </span>
            </div>
            {task.comments?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-1 text-zinc-700 dark:text-zinc-200">
                  💬 Comments:
                </p>
                <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                  {task.comments.map((comment, i) => (
                    <li key={i}>{comment.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminTaskDashboard;
