// ////////////very well working /////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StaffBoard = () => {
//   const [userData, setUserData] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [leaves, setLeaves] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [newLeave, setNewLeave] = useState({ reason: '', startDate: '', endDate: '' });
//   const [newTaskBlocker, setNewTaskBlocker] = useState({ taskId: '', blocker: '' });
  
//   const staffId = 4; // Logged-in staff ID, update dynamically for actual use
//   const supervisorId = 2; // Example supervisor ID

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/${staffId}`);
//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
//     fetchUserData();

//     const fetchStaffData = async () => {
//       try {
//         const tasksResponse = await axios.get(`http://localhost:5000/tasks?assignedTo=${staffId}`);
//         const leavesResponse = await axios.get(`http://localhost:5000/leaves?staffId=${staffId}`);
//         const notificationsResponse = await axios.get(`http://localhost:5000/notifications?staffId=${staffId}`);
        
//         setTasks(tasksResponse.data);
//         setLeaves(leavesResponse.data);
//         setNotifications(notificationsResponse.data);
//       } catch (error) {
//         console.error('Error fetching staff data:', error);
//       }
//     };

//     fetchStaffData();
//   }, [staffId]);

//   const handleLeaveSubmit = async (e) => {
//     e.preventDefault();
//     if (newLeave.reason && newLeave.startDate && newLeave.endDate) {
//       try {
//         const leave = { ...newLeave, status: 'Pending', staffId };
//         await axios.post('http://localhost:5000/leaves', leave);
        
//         // Notify the supervisor about the leave request
//         const notification = {
//           staffId: supervisorId,  // Supervisor's ID
//           message: `Staff member ${userData.name} has applied for leave from ${newLeave.startDate} to ${newLeave.endDate}.`,
//           date: new Date().toISOString(),
//         };
//         await axios.post('http://localhost:5000/notifications', notification);
        
//         setLeaves([...leaves, leave]);
//         setNewLeave({ reason: '', startDate: '', endDate: '' });
//         alert('Leave request submitted!');
//       } catch (error) {
//         console.error('Error submitting leave request:', error);
//       }
//     }
//   };

//   const handleAddBlocker = async (e) => {
//     e.preventDefault();
//     if (newTaskBlocker.blocker && newTaskBlocker.taskId) {
//       try {
//         const updatedTask = tasks.find((task) => task.id === newTaskBlocker.taskId);
//         updatedTask.blocker = newTaskBlocker.blocker;
//         await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
//         setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//         setNewTaskBlocker({ taskId: '', blocker: '' });
//         alert('Blocker added!');
//       } catch (error) {
//         console.error('Error adding blocker:', error);
//       }
//     }
//   };

//   const handleTaskComplete = async (taskId) => {
//     try {
//       const updatedTask = tasks.find(task => task.id === taskId);
//       updatedTask.status = 'Completed';
      
//       // Send notification to supervisor about task completion
//       const notification = {
//         staffId: supervisorId,  // Supervisor's ID
//         message: `Staff member ${userData.name} has completed the task "${updatedTask.title}".`,
//         date: new Date().toISOString(),
//       };
      
//       await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);
//       await axios.post('http://localhost:5000/notifications', notification);
      
//       setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
//       alert('Task marked as completed!');
//     } catch (error) {
//       console.error('Error updating task status:', error);
//     }
//   };
  
//   return (
//     <div>
//       <h1>{userData?.name} - Staff Dashboard</h1>

//       <h2>Your Tasks</h2>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {tasks.map((task) => (
//           <li key={task.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//             <p><strong>Task:</strong> {task.title}</p>
//             <p><strong>Description:</strong> {task.description}</p>
//             <p><strong>Status:</strong> {task.status}</p>
//             <p><strong>Deadline:</strong> {task.deadline}</p>
//             <p><strong>Assigned By:</strong> {task.assignedBy && `Supervisor ${task.assignedBy}`}</p>
//             <p><strong>Blocker:</strong> {task.blocker || 'None'}</p>
//             <form onSubmit={handleAddBlocker}>
//               <label>Add Blocker:</label>
//               <input
//                 type="text"
//                 value={newTaskBlocker.blocker}
//                 onChange={(e) => setNewTaskBlocker({ ...newTaskBlocker, blocker: e.target.value, taskId: task.id })}
//                 placeholder="Describe the blocker"
//               />
//               <button type="submit">Add Blocker</button>
//             </form>
//             <button onClick={() => handleTaskComplete(task.id)}>Complete Task</button>
//           </li>
//         ))}
//       </ul>

//       <h2>Your Leave Requests</h2>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {leaves.map((leave) => (
//           <li key={leave.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//             <p><strong>Reason:</strong> {leave.reason}</p>
//             <p><strong>Start Date:</strong> {leave.startDate}</p>
//             <p><strong>End Date:</strong> {leave.endDate}</p>
//             <p><strong>Status:</strong> {leave.status}</p>
//           </li>
//         ))}
//       </ul>

//       <h2>Submit a Leave Request</h2>
//       <form onSubmit={handleLeaveSubmit}>
//         <label>Reason:</label>
//         <input
//           type="text"
//           value={newLeave.reason}
//           onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
//           placeholder="Reason for leave"
//         />
//         <label>Start Date:</label>
//         <input
//           type="date"
//           value={newLeave.startDate}
//           onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
//         />
//         <label>End Date:</label>
//         <input
//           type="date"
//           value={newLeave.endDate}
//           onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
//         />
//         <button type="submit">Submit Leave Request</button>
//       </form>

//       <h2>Notifications</h2>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {notifications.map((notification) => (
//           <li key={notification.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
//             <p>{notification.message}</p>
//             <p><strong>Date:</strong> {notification.date}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StaffBoard;


////////////second working page 1st///////////////

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StaffBoard.css';
import axios from 'axios';

const StaffBoard = () => {
  const { userId } = useParams(); // Fetch userId from URL
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newLeave, setNewLeave] = useState({ reason: '', startDate: '', endDate: '', supervisorId: '' });
  const [newTaskBlocker, setNewTaskBlocker] = useState({ taskId: '', blocker: '' });
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all necessary data in a single call
        const [userResponse, tasksResponse, leavesResponse, notificationsResponse, usersResponse] = await Promise.all([
          axios.get(`http://localhost:5000/users/${userId}`),
          axios.get(`http://localhost:5000/tasks?assignedTo=${userId}`),
          axios.get(`http://localhost:5000/leaves?staffId=${userId}`),
          axios.get(`http://localhost:5000/notifications?staffId=${userId}`),
          axios.get('http://localhost:5000/users') // Fetch all users for supervisor data
        ]);

        setUserData(userResponse.data);
        setTasks(tasksResponse.data);
        setLeaves(leavesResponse.data);
        setNotifications(notificationsResponse.data);

        // Filter supervisors
        const supervisorsData = usersResponse.data.filter(user => user.role === 'Supervisor');
        setSupervisors(supervisorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    if (newLeave.reason && newLeave.startDate && newLeave.endDate && newLeave.supervisorId) {
      try {
        const leave = { 
          ...newLeave, 
          status: 'Pending', 
          staffId: userId 
        };
  
        // Save the leave request to the backend
        const response = await axios.post('http://localhost:5000/leaves', leave);
  
        // Send a notification to the supervisor about the new leave request
        const notification = {
          supervisorId: newLeave.supervisorId,  // Send notification to the chosen supervisor
          staffId: userId,
          message: `A new leave request has been submitted by ${userData.name} for the dates ${newLeave.startDate} to ${newLeave.endDate}. Reason: ${newLeave.reason}`,
          date: new Date().toISOString(),
        };
  
        // Send the notification
        await axios.post('http://localhost:5000/notifications', notification);
  
        // Update the leaves state for the frontend
        setLeaves([...leaves, response.data]);
  
        // Reset the leave form
        setNewLeave({ reason: '', startDate: '', endDate: '', supervisorId: '' });
  
        alert('Leave request submitted and supervisor notified!');
      } catch (error) {
        console.error('Error submitting leave request:', error);
      }
    }
  };
  
  const handleAddBlocker = async (e) => {
    e.preventDefault();
    if (newTaskBlocker.blocker && newTaskBlocker.taskId) {
      try {
        // Find the task based on the taskId
        const updatedTask = tasks.find((task) => task.id === newTaskBlocker.taskId);
        updatedTask.blocker = newTaskBlocker.blocker;
  
        // Get the supervisorId from the task (the supervisor who assigned the task)
        const supervisorId = updatedTask.assignedBy;
  
        // Create a notification for the supervisor about the blocker
        const notification = {
          supervisorId: supervisorId,  // Send the notification to the supervisor who assigned the task
          staffId: userId,
          message: `A blocker has been added to your task: "${updatedTask.title}". Blocker: "${updatedTask.blocker}"`,
          date: new Date().toISOString(),
        };
  
        // Update the task with the new blocker
        await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
  
        // Send the notification to the correct supervisor
        await axios.post('http://localhost:5000/notifications', notification);
  
        // Update the state with the new blocker
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setNewTaskBlocker({ taskId: '', blocker: '' });
  
        alert('Blocker added!');
      } catch (error) {
        console.error('Error adding blocker:', error);
      }
    }
  };
  
  const handleTaskComplete = async (taskId) => {
    try {
      const updatedTask = tasks.find(task => task.id === taskId);
      updatedTask.status = 'Completed';
      await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
      alert('Task marked as completed!');
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="staff-board-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li className="sidebar-item">Dashboard</li>
          <li className="sidebar-item">Tasks</li>
          <li className="sidebar-item">Leave Requests</li>
          <li className="sidebar-item">Notifications</li>
          <li className="sidebar-item">Profile / Settings</li>
          <li className="sidebar-item">Reports / Analytics</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>{userData?.name} - Staff Dashboard</h1>

        <section className="section">
          <h2>Your Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks assigned to you.</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <p><strong>Task:</strong> {task.title}</p>
                  <p>{task.description}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                  <p><strong>Assigned By:</strong> {task.assignedBy}</p> 
                  <p><strong>Assigned At:</strong> {new Date(task.assignedAt).toLocaleString()}</p>
                  <button onClick={() => handleTaskComplete(task.id)}>Complete Task</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2>Task Blocker</h2>
          <form onSubmit={handleAddBlocker}>
            <label>Select Task:</label>
            <select
              value={newTaskBlocker.taskId}
              onChange={(e) => setNewTaskBlocker({ ...newTaskBlocker, taskId: e.target.value })}
            >
              <option value="">Select Task</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>{task.title}</option>
              ))}
            </select>

            <label>Blocker Description:</label>
            <input
              type="text"
              value={newTaskBlocker.blocker}
              onChange={(e) => setNewTaskBlocker({ ...newTaskBlocker, blocker: e.target.value })}
            />

            <button type="submit">Add Blocker</button>
          </form>
        </section>

        <section className="section">
          <h2>Your Leave Requests</h2>
          {leaves.length === 0 ? (
            <p>No leave requests applied yet.</p>
          ) : (
            <ul>
              {leaves.map((leave) => (
                <li key={leave.id}>
                  <p><strong>Reason:</strong> {leave.reason}</p>
                  <p><strong>Start Date:</strong> {leave.startDate}</p>
                  <p><strong>End Date:</strong> {leave.endDate}</p>
                  <p><strong>Status:</strong> {leave.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2>Submit a Leave Request</h2>
          <form onSubmit={handleLeaveSubmit}>
            <label>Reason:</label>
            <input
              type="text"
              value={newLeave.reason}
              onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
            />
            <label>Start Date:</label>
            <input
              type="date"
              value={newLeave.startDate}
              onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={newLeave.endDate}
              onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
            />
            <label>Choose Supervisor:</label>
            <select
              value={newLeave.supervisorId}
              onChange={(e) => setNewLeave({ ...newLeave, supervisorId: e.target.value })}
            >
              {supervisors.length === 0 ? (
                <option>No supervisors available</option>
              ) : (
                supervisors.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </option>
                ))
              )}
            </select>
            <button type="submit">Submit Leave Request</button>
          </form>
        </section>

        <section className="section">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StaffBoard;


