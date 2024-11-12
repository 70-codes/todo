import React from "react";

function Edit({ task, onEdit }) {
  const handleEdit = () => {
    const newText = prompt("Edit task", task.text);
    if (newText) onEdit(task.id, newText);
  };

  return (
    <button
      className="btn btn-sm btn-warning ms-2"
      onClick={handleEdit}
    >
      Edit
    </button>
  );
}

export default Edit;
