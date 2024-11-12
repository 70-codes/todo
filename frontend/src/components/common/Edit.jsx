import React from "react";
import { normalAxios } from "../../api/axios"; // Make sure you import your Axios instance

function Edit({ task, onEdit }) {
  const handleEdit = async () => {
    const newText = prompt("Edit task", task.text);
    if (newText && newText !== task.text) {
      try {
        // Send a request to the backend to update the task with the new text
        const response = await normalAxios.put(`/api/tasks/${task.id}`, {
          text: newText,
        });

        // If the backend update is successful, update the task in the UI
        if (response.status === 200) {
          onEdit(task.id, newText); // Pass the new text to the parent component to update state
        }
      } catch (error) {
        console.error("Error editing task:", error);
        alert("Failed to update task. Please try again.");
      }
    }
  };

  return (
    <button className="btn btn-sm btn-warning ms-2" onClick={handleEdit}>
      Edit
    </button>
  );
}

export default Edit;
