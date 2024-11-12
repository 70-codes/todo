import React, { useState } from "react";
import { normalAxios } from "../../api/axios"; // Ensure you have an Axios instance set up

function Add({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTask.trim()) {
      try {
        // Get the user ID (assume it's stored in localStorage after login)
        const userId = localStorage.getItem("userId");

        if (!userId) {
          // Handle the case when there's no user logged in
          alert("Please log in first.");
          return;
        }

        // Send a request to the backend to create a new task
        const response = await normalAxios.post("/api/tasks", {
          title: newTask,   // Title is what the backend expects
          user: userId,     // Pass the user ID (ensure it's valid)
        });

        // If the task is created successfully, call the onAdd function to update the UI
        onAdd(response.data);

        // Clear the input field
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task. Please try again.");
      }
    }
  };

  return (
    <form
      className="d-flex justify-content-center align-items-center mb-4"
      onSubmit={handleSubmit}
    >
      <div data-mdb-input-init className="form-outline flex-fill">
        <input
          type="text"
          id="form2"
          className="form-control"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-info ms-2">
        Add
      </button>
    </form>
  );
}

export default Add;
