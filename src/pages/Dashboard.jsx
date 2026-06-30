import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import AddTaskModal from "../components/AddTaskModal";
import TaskCard from "../components/TaskCard";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";

export default function Dashboard({ setLoggedIn }) {
  const [tasks, setTasks] = useState([]);

  const [sortBy, setSortBy] = useState("");
  
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  // -----------------------------
  // LOAD TASKS
  // -----------------------------

  const loadTasks = async () => {
    setLoading(true);

    const data = await fetchTasks();

    setTasks(data);

    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // -----------------------------
  // ADD / UPDATE
  // -----------------------------

const handleSaveTask = async (task) => {
  if (editingTask) {
    await updateTask(editingTask.id, {
      ...editingTask,
      ...task,
    });
  } else {
    await createTask(task);
  }

  setEditingTask(null);
  setOpenModal(false);

  await loadTasks();
};
  // -----------------------------
  // DELETE
  // -----------------------------

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    await deleteTask(id);

    loadTasks();
  };

  // -----------------------------
  // COMPLETE
  // -----------------------------

  const handleToggle = async (task) => {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });

    loadTasks();
  };

  // -----------------------------
  // EDIT
  // -----------------------------

  const handleEdit = (task) => {
    setEditingTask(task);

    setOpenModal(true);
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------

const handleLogout = () => {
  localStorage.removeItem("loggedIn");
  setLoggedIn(false);
};

  // -----------------------------
  // DASHBOARD STATS
  // -----------------------------

// -----------------------------
// DASHBOARD STATS
// -----------------------------

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const pendingTasks = tasks.filter(
  (task) => !task.completed
).length;

const overdueTasks = tasks.filter((task) => {
  if (task.completed) return false;
  return new Date(task.dueDate) < new Date();
}).length;

// -----------------------------
// SORT & FILTER
// -----------------------------

let filteredTasks = [...tasks];

// Filter by Status
if (statusFilter === "Completed") {
  filteredTasks = filteredTasks.filter((task) => task.completed);
} else if (statusFilter === "Pending") {
  filteredTasks = filteredTasks.filter((task) => !task.completed);
}

// Filter by Priority
if (priorityFilter !== "All") {
  filteredTasks = filteredTasks.filter(
    (task) => task.priority === priorityFilter
  );
}

// Sort
if (sortBy === "title") {
  filteredTasks.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
} else if (sortBy === "dueDate") {
  filteredTasks.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
} else if (sortBy === "priority") {
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  filteredTasks.sort(
    (a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar
        openModal={() => {
          setEditingTask(null);
          setOpenModal(true);
        }}
        logout={handleLogout}
      />

      <div className="max-w-6xl mx-auto p-6">

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Total Tasks
            </h3>

            <p className="text-3xl font-bold mt-2">
              {totalTasks}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Completed
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingTasks}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">
              Overdue
            </h3>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {overdueTasks}
            </p>
          </div>

        </div>


        {/* Sort & Filter */}

<div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-4">

  {/* Sort */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Sort By
    </label>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded-lg p-2"
    >
      <option value="">None</option>
      <option value="title">Title (A-Z)</option>
      <option value="priority">Priority</option>
      <option value="dueDate">Due Date</option>
    </select>
  </div>

  {/* Status Filter */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Status
    </label>

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="border rounded-lg p-2"
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </select>
  </div>

  {/* Priority Filter */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Priority
    </label>

    <select
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
      className="border rounded-lg p-2"
    >
      <option value="All">All</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>

</div>

        {/* Loading */}

        {loading ? (
          <div className="text-center py-20 text-xl">
            Loading tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <h2 className="text-2xl font-semibold">
              No Tasks Found
            </h2>

            <p className="text-gray-500 mt-3">
              Click "Add Task" to create your first task.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
              />
            ))}

          </div>
        )}

      </div>

      <AddTaskModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />

    </div>
  );
}