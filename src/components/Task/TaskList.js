import React from "react";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const handleUpdate = (task) => {
    const updatedTask = { ...task, status: "Completed" };
    updateTask(updatedTask);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>Task: {task.task}</p>
            <p>Assigned To: Staff ID {task.staffId}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdate(task)}>Mark Completed</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
