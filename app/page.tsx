"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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

  function completeTask(id: number) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          TODO APPLICATION
        </h1>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 rounded border p-3"
          />

          <button
            onClick={addTask}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded border p-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => completeTask(item.id)}
                />

                <span
                  className={
                    item.completed
                      ? "text-gray-400 line-through"
                      : ""
                  }
                >
                  {item.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(item.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}