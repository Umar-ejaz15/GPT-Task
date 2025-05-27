import { GetTaskById, UpdateTaskDetailsByID } from "@/services/user-task";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  ongoing: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
};

const priorityColors = {
  low: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  medium:
    "bg-orange-200 text-orange-800 dark:bg-orange-700 dark:text-orange-100",
  high: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100",
};

const ShowUserTasks = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTasks", userId],
    queryFn: () => GetTaskById(userId),
    enabled: !!userId,
    refetchOnWindowFocus: true,
  });

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "pending") return "ongoing";
    if (currentStatus === "ongoing") return "completed";
    return null;
  };

  const { mutate: updateTaskStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({ taskId, nextStatus }) =>
      UpdateTaskDetailsByID(taskId, { status: nextStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userTasks", userId] });
    },
    onError: (error) => {
      console.error("Update failed", error);
    },
  });

  if (isLoading) {
    return (
      <p className="p-6 text-zinc-700 dark:text-zinc-200">Loading tasks...</p>
    );
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to fetch tasks.</p>;
  }

  return (
    <div>
      {data.map((task, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-5 hover:shadow-lg transition-all mb-4"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
              {task.title}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                statusColors[task.status]
              }`}
            >
              {task.status}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {task.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {task.dueDate}
            </span>
          </div>

          {/* Status update button */}
          {getNextStatus(task.status) && (
            <button
              onClick={() =>
                updateTaskStatus({
                  taskId: task._id,
                  nextStatus: getNextStatus(task.status),
                })
              }
              disabled={isUpdating}
              className="mt-4 inline-block px-3 py-1 text-sm bg-zinc-800 text-white rounded hover:bg-zinc-700 disabled:opacity-50"
            >
              {isUpdating
                ? "Updating..."
                : `Mark as ${getNextStatus(task.status)}`}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowUserTasks;
