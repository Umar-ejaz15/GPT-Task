import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AssignTask } from "@/services/task-by-admin";
import { Button } from "@/components/ui/button";
import { ChatWithAI } from "@/services/GoogleAPI";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedToEmail: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: AssignTask,
    onSuccess: (data) => {
      toast.success("✅ Task created successfully!");
      console.log("Task created:", data);
      resetForm();
    },
    onError: (error) => {
      toast.error("❌ Failed to create task.");
      console.error("Error creating task:", error);
    },
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      assignedToEmail: "",
      dueDate: "",
      priority: "medium",
      status: "pending",
    });
  };

  const generateDescription = async () => {
    if (!task.title) {
      toast.error("Please enter a title first.");
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Generate a task description for: "${task.title}". Keep it short, 2-3 sentences.`;
      const dataForAI = {
        type: "application/json",
        prompt: prompt,
      };

      const result = await ChatWithAI(dataForAI);
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setTask((prev) => ({ ...prev, description: generatedText }));
        toast.success("✨ Description generated!");
      } else {
        throw new Error("No description returned.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to generate description.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.assignedToEmail || !task.dueDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    mutate(task);
  };

  return (
    <div className="bg-zinc-900 text-white p-8 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md"
            placeholder="e.g., Build login page"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md"
            placeholder="Task details..."
            disabled={isPending}
          />
          <Button
            type="button"
            onClick={generateDescription}
            className="mt-2"
            disabled={isGenerating || isPending}
          >
            {isGenerating ? "Generating..." : "✨ Generate with AI"}
          </Button>
        </div>

        <div>
          <label className="block mb-1 font-medium">Assigned To (Email)</label>
          <input
            type="email"
            name="assignedToEmail"
            value={task.assignedToEmail}
            onChange={handleChange}
            className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md"
            placeholder="Enter user email"
            required
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md"
              required
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md"
              disabled={isPending}
            >
              <option value="low">Low 🟢</option>
              <option value="medium">Medium 🟡</option>
              <option value="high">High 🔴</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md"
            disabled={isPending}
          >
            <option value="pending">Pending ⏳</option>
            <option value="ongoing">Ongoing 🚧</option>
            <option value="completed">Completed ✅</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 rounded-md font-semibold"
        >
          {isPending ? "Creating..." : "🚀 Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
