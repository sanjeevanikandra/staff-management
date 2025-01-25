import React, { useState } from "react";
import TaskForm from "../components/Task/TaskForm";
import TaskList from "../components/Task/TaskList";
import StaffList from "../components/StaffList";


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
    <div className="App">
      <h1>Supervisor Dashboard</h1>
      <TaskForm staff={staff} addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
      <StaffList staff={staff} />
    </div>
  );
};

export default App;
