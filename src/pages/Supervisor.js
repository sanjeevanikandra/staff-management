import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/Task/TaskForm"; // Adjusted import path
import StaffBoard from "./StaffBoard"; // Adjusted import path


const Supervisor = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    // Fetch staff data
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:5000/staff");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, []);

  const addTask = async (task) => {
    try {
      await axios.post("http://localhost:5000/staff", task);
      alert("Task assigned successfully!");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const sendLeaveRequest = async (request) => {
    try {
      await axios.post("http://localhost:5000/admin", request);
      alert("Leave request sent successfully!");
    } catch (error) {
      console.error("Error sending leave request:", error);
    }
  };

  return (
    <div>
      <h1>Supervisor Dashboard</h1>
      <TaskForm staff={staff} addTask={addTask} />
      <StaffBoard staff={staff} />
     
    </div>
  );
};

export default Supervisor;
