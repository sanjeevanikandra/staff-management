import React, { useState } from "react";

const TaskForm = ({ staff, addTask }) => {
  const [task, setTask] = useState("");
  const [staffId, setStaffId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && staffId) {
      addTask({ id: Date.now(), task, staffId, status: "Pending" });
      setTask("");
      setStaffId("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Assign Task</h2>
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
        <option value="">Select Staff</option>
        {staff.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      <button type="submit">Assign Task</button>
    </form>
  );
};

export default TaskForm;
