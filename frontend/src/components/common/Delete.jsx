import React from "react";

function Delete({ taskId, onDelete }) {
  return (
    <button
      className="btn btn-sm btn-danger ms-auto"
      onClick={() => onDelete(taskId)}
    >
      Delete
    </button>
  );
}

export default Delete;
