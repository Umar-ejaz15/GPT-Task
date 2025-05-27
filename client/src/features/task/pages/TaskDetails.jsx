import { GetTaskById } from "@/services/task-by-admin";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TaskDetails = () => {
  const [localTaskData, setLocalTaskData] = useState([]);
  const params = useParams();

  const { data: taskData, isError, error, isLoading } = useQuery({
    queryKey: ["adminTasks", params.id],
    queryFn: () => GetTaskById(params.id),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    retry: 3,
    onError: (error) => {
      console.error("Error fetching task:", error);
    },
  });

  useEffect(() => {
    if (isError) {
      console.error("Task fetch error:", error);
    }
    if (taskData) {
      setLocalTaskData(taskData);
    }
  }, [isError, error, taskData]);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (isError) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: Task not found</div>;
  if (!taskData) return <div className="flex items-center justify-center min-h-screen">No task data available</div>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      {taskData && (
        <Link
          to={`/admin/dashboard/task/${taskData._id}`}
          className="bg-white w-1/2 px-10 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-5 hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
              {taskData.title}
            </h3>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500 text-white">
              {taskData.status}
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
            {taskData.description}
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-500 text-white">
              Priority: {taskData.priority}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Due:{" "}
              {taskData.dueDate instanceof Date
                ? taskData.dueDate.toDateString()
                : "N/A"}
            </span>
          </div>
          {taskData.comments?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold mb-1 text-zinc-700 dark:text-zinc-200">
                💬 Comments:
              </p>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                {taskData.comments.map((comment, i) => (
                  <li key={i}>{comment.text}</li>
                ))}
              </ul>
            </div>
          )}
        </Link>
      )}
    </div>
  );
};

export default TaskDetails;