import React, { useState } from "react";

function Add({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAdd(newTask);
      setNewTask("");
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
