import React from "react";

export default function Navbar({
  openModal,
  logout,
}) {
  return (
    <header className="border-b p-5 flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        My Tasks
      </h1>

      <div className="flex gap-4 items-center">
        <button
          onClick={openModal}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add Task
        </button>

        <button
          onClick={logout}
          className="text-gray-700"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}