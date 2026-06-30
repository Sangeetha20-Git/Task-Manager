console.log(import.meta.env.VITE_API_URL);
const BASE_URL = "http://127.0.0.1:5000/tasks";

// GET ALL TASKS
export const fetchTasks = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};

// ADD TASK
export const createTask = async (task) => {
  console.log("Sending task:", task);

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const data = await response.json();
    console.log("Response:", data);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// UPDATE TASK
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return await response.json();
  } catch (error) {
    console.error("Update Error:", error);
    return null;
  }
};

// DELETE TASK
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    return true;
  } catch (error) {
    console.error("Delete Error:", error);
    return false;
  }
};