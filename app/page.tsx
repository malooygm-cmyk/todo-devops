"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: "Application loads correctly",
      completed: true,
    },
    {
      id: 2,
      text: "Add Task works",
      completed: false,
    },
    {
      id: 3,
      text: "Complete Task works",
      completed: false,
    },
    {
      id: 4,
      text: "Delete Task works",
      completed: false,
    },
    {
      id: 5,
      text: "No obvious errors",
      completed: false,
    },
    {
      id: 6,
      text: "Layout works correctly",
      completed: false,
    },
  ]);

  // Add Task
  function addTask() {
    if (task.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  // Complete Task
  function completeTask(id: number) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  // Delete Task
  function deleteTask(id: number) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  // Press Enter to add task
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          TODO APPLICATION
        </h1>

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a task..."
            className="flex-1 border border-gray-400 rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-gray-300 rounded-md px-4 py-3"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => completeTask(item.id)}
                className="w-5 h-5 cursor-pointer accent-blue-600"
              />

              {/* Task Text */}
              <span
                className={`flex-1 text-lg ${
                  item.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {item.text}
              </span>

              {/* Complete Button */}
              {!item.completed && (
                <button
                  onClick={() => completeTask(item.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  ✓ Complete
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>

        {/* Expected Result */}
        <div className="mt-8 border border-blue-200 bg-blue-50 rounded-md p-5">
          <div className="flex items-start gap-4">

            {/* Check Icon */}
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
              ✓
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-800">
                Expected Result
              </h2>

              <p className="text-blue-700 mt-1">
                The application should work correctly in the Staging
                Environment.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}