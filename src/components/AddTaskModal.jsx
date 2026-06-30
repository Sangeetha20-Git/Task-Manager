import { useState, useEffect } from "react";

export default function AddTaskModal({
  open,
  onClose,
  onSave,
  taskToEdit = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate);
    } else {
      resetForm();
    }
  }, [taskToEdit, open]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

const handleSubmit = async () => {
  if (!title.trim()) {
    alert("Task title is required.");
    return;
  }

  if (!dueDate) {
    alert("Please select a due date.");
    return;
  }

  const task = {
    title,
    description,
    priority,
    dueDate,
    completed: taskToEdit ? taskToEdit.completed : false,
    createdAt: taskToEdit
      ? taskToEdit.createdAt
      : new Date().toISOString(),
  };

  await onSave(task);

  resetForm();
  onClose();
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          {taskToEdit ? "Edit Task" : "Add Task"}
        </h2>

        <div className="space-y-4">

          <div>
            <label className="font-medium block mb-1">
              Task Title
            </label>

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              Description
            </label>

            <textarea
              rows="3"
              className="w-full border rounded-lg p-3"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="font-medium block mb-1">
                Priority
              </label>

              <select
                className="w-full border rounded-lg p-3"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="font-medium block mb-1">
                Due Date
              </label>

              <input
                type="date"
                className="w-full border rounded-lg p-3"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border rounded-lg px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white rounded-lg px-5 py-2"
          >
            {taskToEdit ? "Update" : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}