import React, { useState } from "react";
import "../../css/app.css";
import EditTask from "../common/Edit";
import DeleteTask from "../common/Delete";
import AddTask from "../common/Add";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleAddTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-center text-4xl mb-0">My To-Do List</h1>
                    <button
                      className="btn btn-danger"
                      onClick={() => alert("Logout functionality will be implemented later.")}
                    >
                      Logout
                    </button>
                  </div>

                  {/* Add Task Component */}
                  <AddTask onAdd={handleAddTask} />

                  <ul
                    className="nav nav-tabs mb-4 pb-2"
                    id="ex1"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${filter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${filter === "active" ? "active" : ""}`}
                        onClick={() => setFilter("active")}
                      >
                        Active
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${filter === "completed" ? "active" : ""}`}
                        onClick={() => setFilter("completed")}
                      >
                        Completed
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-tabs-1"
                      role="tabpanel"
                    >
                      <ul className="list-group mb-0">
                        {filteredTasks.map((task) => (
                          <li
                            key={task.id}
                            className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleTask(task.id)}
                            />
                            {task.completed ? (
                              <s>{task.text}</s>
                            ) : (
                              <span>{task.text}</span>
                            )}
                            <DeleteTask taskId={task.id} onDelete={handleDeleteTask} />
                            <EditTask task={task} onEdit={handleEditTask} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;