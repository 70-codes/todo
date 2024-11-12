import React from "react";
import { normalAxios } from "../../api/axios"; // Ensure you have an Axios instance set up

function Delete({ taskId, onDelete }) {
  const handleDelete = async () => {
    try {
      // Send a request to delete the task from the database
      const response = await normalAxios.delete(`/api/tasks/${taskId}`);

      // If the task is successfully deleted, call the onDelete function to remove it from the UI
      onDelete(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <button className="btn btn-sm btn-danger ms-auto" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default Delete;
