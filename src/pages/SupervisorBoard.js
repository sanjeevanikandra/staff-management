import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import StaffList from "./components/StaffList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Emily Davis" },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
<<<<<<< HEAD:src/components/SupervisorBoard.js
    <div className="App">
      <h1>Supervisor Dashboard</h1>
      <TaskForm staff={staff} addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
      <StaffList staff={staff} />
=======
    <div>
      <h1>Supervisor Board</h1>
>>>>>>> 17974671983923403ed60f027d4047312257fa55:src/pages/SupervisorBoard.js
    </div>
  );
};

export default App;
