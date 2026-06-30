import { useMemo } from "react";

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {
  const isOverdue = useMemo(() => {
    if (task.completed) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return new Date(task.dueDate) < today;
  }, [task]);

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-5">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="mt-1 accent-indigo-600"
          />

          <div>

            <h3
              className={`font-bold text-lg ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>

            <p className="text-gray-600 mt-1">
              {task.description}
            </p>

          </div>

        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 font-semibold"
        >
          Delete
        </button>

      </div>

      <div className="flex flex-wrap gap-3 mt-5">

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          📅 {task.dueDate}
        </span>

        {task.completed && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            ✅ Completed
          </span>
        )}

        {isOverdue && (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
            🔴 Overdue
          </span>
        )}

      </div>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit(task)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

      </div>

    </div>
  );
}