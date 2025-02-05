/////////chtl+z/////////////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SupervisorPage = () => {
  const { userId } = useParams();
  const [supervisorData, setSupervisorData] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
  });
  const [leaves, setLeaves] = useState([]);
  const [notifications, setNotifications] = useState([]);  // Added state for notifications
  const [editingTaskId, setEditingTaskId] = useState(null); // State to track which task is being edited

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch supervisor data based on userId
        const supervisorResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        setSupervisorData(supervisorResponse.data);
  
        // Fetch staff data and tasks based on supervisor's userId
        const usersResponse = await axios.get('http://localhost:5000/users');
        const allUsers = usersResponse.data;
        const filteredStaff = allUsers.filter(user => user.role.toLowerCase() === 'staff');
        const uniqueStaff = Array.from(new Map(filteredStaff.map(user => [user.id, user])).values());
        setStaffData(uniqueStaff);
  
        // Fetch tasks assigned by the supervisor
        const tasksResponse = await axios.get(`http://localhost:5000/tasks?assignedBy=${userId}`);
        setTasks(tasksResponse.data);
  
        // Fetch leave requests for staff under the supervisor
        const leavesResponse = await axios.get(`http://localhost:5000/leaves?supervisorId=${userId}`);
        setLeaves(leavesResponse.data);
  
        // Fetch notifications for the supervisor (blockers, leave requests, etc.)
        const notificationsResponse = await axios.get(`http://localhost:5000/notifications?supervisorId=${userId}`);
        setNotifications(notificationsResponse.data);
      } catch (error) {
        console.error('Error fetching supervisor data:', error);
      }
    };
  
    fetchData();
  }, [userId]); // Dependency on userId so the data refreshes when the supervisor changes
  
  

  const handleLeaveApproval = async (leaveId, staffId) => {
    try {
        const updatedLeave = leaves.find((leave) => leave.id === leaveId);
        updatedLeave.status = 'Approved';

        // Create notification for staff about leave approval
        const notification = {
            staffId: staffId,
            message: `Your leave request from ${updatedLeave.startDate} to ${updatedLeave.endDate} has been approved.`,
            date: new Date().toISOString(),
        };

        await axios.put(`http://localhost:5000/leaves/${leaveId}`, updatedLeave);
        await axios.post('http://localhost:5000/notifications', notification); // Send notification to staff

        setLeaves(leaves.map((leave) => (leave.id === leaveId ? updatedLeave : leave)));
        alert('Leave approved and notification sent to staff!');
    } catch (error) {
        console.error('Error approving leave request:', error);
    }
  };

  const handleReactToBlocker = async (taskId) => {
    try {
        const updatedTask = tasks.find((task) => task.id === taskId);
        updatedTask.blocker = 'Acknowledged by Supervisor';

        const notification = {
            staffId: updatedTask.assignedTo,
            message: `Your blocker on task "${updatedTask.title}" has been acknowledged by the supervisor.`,
            date: new Date().toISOString(),
        };

        await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
        await axios.post('http://localhost:5000/notifications', notification); // Send notification to staff

        setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
        alert('Blocker acknowledged!');
    } catch (error) {
        console.error('Error reacting to blocker:', error);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (newTask.title && newTask.description && newTask.assignedTo) {
      try {
        const supervisorId = supervisorData?.id; // Use supervisorData.id for supervisor's id
  
        // Get the current date and time for task assignment
        const assignedAt = new Date().toISOString(); // Get the current time in ISO format
  
        const task = { 
          ...newTask, 
          assignedBy: supervisorId, 
          status: 'Pending', 
          assignedAt: assignedAt // Add the date and time when the task is assigned
        };
  
        const notification = {
          staffId: newTask.assignedTo,
          message: `You have been assigned a new task: "${newTask.title}"`,
          date: new Date().toISOString(),
        };
  
        if (editingTaskId) {
          // If editing an existing task, update it
          await axios.put(`http://localhost:5000/tasks/${editingTaskId}`, task);
          const updatedTasks = tasks.map((taskItem) =>
            taskItem.id === editingTaskId ? { ...taskItem, ...task } : taskItem
          );
          setTasks(updatedTasks);
          alert('Task updated successfully!');
        } else {
          // If it's a new task, create it
          await axios.post('http://localhost:5000/tasks', task);
          setTasks([...tasks, task]);
          alert('Task assigned successfully!');
        }
  
        // Reset the form
        setNewTask({ title: '', description: '', assignedTo: '', deadline: '' });
        setEditingTaskId(null); // Clear the editing state
      } catch (error) {
        console.error('Error assigning/updating task:', error);
      }
    }
  };
  

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      assignedTo: taskToEdit.assignedTo,
      deadline: taskToEdit.deadline,
    });
    setEditingTaskId(taskId); // Set task to be edited
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>{supervisorData?.name} - Supervisor Dashboard</h1>

      <h2>Assigned Tasks</h2>
      <ul>
        {tasks.map((task) => {
          const assignedStaff = staffData.find(staff => staff.id === task.assignedTo);
          return (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Assigned To: {assignedStaff ? assignedStaff.name : 'Unknown'}</p> {/* staff name */}
              <p>Status: {task.status}</p>
              <p>Deadline: {task.deadline}</p>
              <p><strong>Blocker:</strong> {task.blocker || 'None'}</p>

              {task.blocker && (
                <button onClick={() => handleReactToBlocker(task.id)}>React to Blocker</button>
              )}
              <button onClick={() => handleEditClick(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          );
        })}
      </ul>

      <h2>{editingTaskId ? 'Edit Task' : 'Assign a Task'}</h2>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task Description"
        />
        <select
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        >
          <option value="">Select Staff</option>
          {staffData.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <button type="submit">{editingTaskId ? 'Update Task' : 'Assign Task'}</button>
      </form>

      <h2>Leave Requests</h2>
      <ul>
        {leaves.map((leave) => (
          <li key={leave.id}>
            <strong>Reason:</strong> {leave.reason} <br />
            <strong>Dates:</strong> {leave.startDate} to {leave.endDate} <br />
            <button onClick={() => handleLeaveApproval(leave.id, leave.staffId)}>Approve Leave</button>
          </li>
        ))}
      </ul>

      <h2>Notifications</h2>
<ul>
  {notifications.map((notification) => (
    <li key={notification.id}>{notification.message}</li>
  ))}
</ul>

    </div>
  );
};

export default SupervisorPage;




