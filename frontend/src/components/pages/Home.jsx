import React, { useState, useEffect } from "react";
import "../../css/app.css";
import EditTask from "../common/Edit";
import DeleteTask from "../common/Delete";
import AddTask from "../common/Add";
import { normalAxios } from "../../api/axios";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await normalAxios.get("/api/tasks");
        setTasks(response.data); // Assuming the API returns the list of tasks
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (taskTitle) => {
    try {
      // Assuming the user ID is available from localStorage or context
      const userId = localStorage.getItem("userId"); 

      const response = await normalAxios.post("/api/tasks", {
        title: taskTitle,
        user: userId,
      });
      setTasks([...tasks, response.data]); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await normalAxios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async (id, newTitle) => {
    try {
      const response = await normalAxios.put(`/api/tasks/${id}`, {
        title: newTitle,
      });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, title: response.data.title } : task
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleToggleTask = async (id) => {
    const task = tasks.find((task) => task._id === id);
    try {
      const response = await normalAxios.put(`/api/tasks/${id}`, {
        completed: !task.completed,
      });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: response.data.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
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

                  <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
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
                    <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel">
                      <ul className="list-group mb-0">
                        {filteredTasks.map((task) => (
                          <li
                            key={task._id}
                            className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleTask(task._id)}
                            />
                            {task.completed ? <s>{task.title}</s> : <span>{task.title}</span>}
                            <DeleteTask taskId={task._id} onDelete={handleDeleteTask} />
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
