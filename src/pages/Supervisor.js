/////////////working project Editing btn is not working/////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SupervisorPage = () => {
//   const [supervisorData, setSupervisorData] = useState(null);
//   const [staffData, setStaffData] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     deadline: '',
//   });
//   const [leaves, setLeaves] = useState([]);
  
//   const supervisorId = 2; // Logged-in supervisor ID

//   useEffect(() => {
//     // Fetch supervisor data
//     const fetchSupervisorData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/${supervisorId}`);
//         setSupervisorData(response.data);
//       } catch (error) {
//         console.error('Error fetching supervisor data:', error);
//       }
//     };
//     fetchSupervisorData();

//     // Fetch staff data
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/users?role=staff');
//         setStaffData(response.data);
//       } catch (error) {
//         console.error('Error fetching staff data:', error);
//       }
//     };
//     fetchStaffData();

//     // Fetch tasks assigned by the supervisor
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/tasks?assignedBy=${supervisorId}`);
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
//     fetchTasks();

//     // Fetch leave requests
//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/leaves?assignedBy=${supervisorId}`);
//         setLeaves(response.data);
//       } catch (error) {
//         console.error('Error fetching leave requests:', error);
//       }
//     };
//     fetchLeaveRequests();
//   }, [supervisorId]);

//   const handleLeaveApproval = async (leaveId, staffId) => {
//     try {
//       const updatedLeave = leaves.find((leave) => leave.id === leaveId);
//       updatedLeave.status = 'Approved';
      
//       // Send notification to staff about approval
//       const notification = {
//         staffId: staffId,  // Staff ID
//         message: `Your leave request from ${updatedLeave.startDate} to ${updatedLeave.endDate} has been approved.`,
//         date: new Date().toISOString(),
//       };
      
//       await axios.put(`http://localhost:5000/leaves/${leaveId}`, updatedLeave);
//       await axios.post('http://localhost:5000/notifications', notification);
      
//       setLeaves(leaves.map((leave) => (leave.id === leaveId ? updatedLeave : leave)));
//       alert('Leave approved and notification sent to staff!');
//     } catch (error) {
//       console.error('Error approving leave request:', error);
//     }
//   };

//   const handleReactToBlocker = async (taskId) => {
//     try {
//       const updatedTask = tasks.find((task) => task.id === taskId);
//       updatedTask.blocker = 'Acknowledged by Supervisor';
  
//       // Send acknowledgment to the staff member
//       const notification = {
//         staffId: updatedTask.assignedTo,  // Staff ID
//         message: `Your blocker on task "${updatedTask.title}" has been acknowledged by the supervisor.`,
//         date: new Date().toISOString(),
//       };
  
//       await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
//       await axios.post('http://localhost:5000/notifications', notification);
      
//       setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
//       alert('Blocker acknowledged!');
//     } catch (error) {
//       console.error('Error reacting to blocker:', error);
//     }
//   };

//   const handleTaskSubmit = async (e) => {
//     e.preventDefault();
//     if (newTask.title && newTask.description && newTask.assignedTo) {
//       try {
//         const task = { ...newTask, assignedBy: supervisorId, status: 'Pending' };
//         await axios.post('http://localhost:5000/tasks', task);
//         setTasks([...tasks, task]);
//         setNewTask({ title: '', description: '', assignedTo: '', deadline: '' });
//         alert('Task assigned successfully!');
//       } catch (error) {
//         console.error('Error assigning task:', error);
//       }
//     }
//   };

//   const handleEditTask = async (taskId) => {
//     try {
//       const task = tasks.find((task) => task.id === taskId);
//       // Show task details in a form and allow supervisor to edit
//       // After edits are made, you can PUT the updated task to the server
//       await axios.put(`http://localhost:5000/tasks/${taskId}`, task);
//       alert('Task updated successfully');
//       // Update state with edited task
//     } catch (error) {
//       console.error('Error editing task:', error);
//     }
//   };
  
//   const handleDeleteTask = async (taskId) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${taskId}`);
//       setTasks(tasks.filter((task) => task.id !== taskId));
//       alert('Task deleted successfully');
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h1>{supervisorData?.name} - Supervisor Dashboard</h1>

//       <h2>Assigned Tasks</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             <strong>{task.title}</strong>
//             <p>{task.description}</p>
//             <p>Assigned To: {task.assignedTo}</p>
//             <p>Status: {task.status}</p>
//             <p>Deadline: {task.deadline}</p>
//             <p><strong>Blocker:</strong> {task.blocker || 'None'}</p>
            
//             {task.blocker && (
//               <button onClick={() => handleReactToBlocker(task.id)}>React to Blocker</button>
//             )}
//             <button onClick={() => handleEditTask(task.id)}>Edit</button>
// <button onClick={() => handleDeleteTask(task.id)}>Delete</button>

//           </li>
//         ))}
//       </ul>

//       <h2>Assign a Task</h2>
//       <form onSubmit={handleTaskSubmit}>
//         <input
//           type="text"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           placeholder="Task Title"
//         />
//         <textarea
//           value={newTask.description}
//           onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//           placeholder="Task Description"
//         />
//         <select
//           value={newTask.assignedTo}
//           onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
//         >
//           <option value="">Select Staff</option>
//           {staffData.map((staff) => (
//             <option key={staff.id} value={staff.id}>
//               {staff.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="date"
//           value={newTask.deadline}
//           onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
//         />
//         <button type="submit">Assign Task</button>
//       </form>

//       <h2>Leave Requests</h2>
//       <ul>
//         {leaves.map((leave) => (
//           <li key={leave.id}>
//             <strong>Reason:</strong> {leave.reason} <br />
//             <strong>Dates:</strong> {leave.startDate} to {leave.endDate} <br />
//             <button onClick={() => handleLeaveApproval(leave.id, leave.staffId)}>Approve Leave</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SupervisorPage;



///////editing btn is working/////////////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupervisorPage = () => {
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
  const [editingTaskId, setEditingTaskId] = useState(null); // State to track which task is being edited

  const supervisorId = 2; // Logged-in supervisor ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supervisorRes, staffRes, tasksRes, leavesRes] = await Promise.all([
          axios.get(`http://localhost:5000/users/${supervisorId}`),
          axios.get('http://localhost:5000/users?role=staff'),
          axios.get(`http://localhost:5000/tasks?assignedBy=${supervisorId}`),
          axios.get(`http://localhost:5000/leaves?assignedBy=${supervisorId}`)
        ]);
        setSupervisorData(supervisorRes.data);
        setStaffData(staffRes.data);
        setTasks(tasksRes.data);
        setLeaves(leavesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [supervisorId]);

  const handleLeaveApproval = async (leaveId, staffId) => {
    try {
      const updatedLeave = leaves.find((leave) => leave.id === leaveId);
      updatedLeave.status = 'Approved';
      
      const notification = {
        staffId: staffId,
        message: `Your leave request from ${updatedLeave.startDate} to ${updatedLeave.endDate} has been approved.`,
        date: new Date().toISOString(),
      };
      
      await axios.put(`http://localhost:5000/leaves/${leaveId}`, updatedLeave);
      await axios.post('http://localhost:5000/notifications', notification);
      
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
      await axios.post('http://localhost:5000/notifications', notification);
      
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
        const task = { ...newTask, assignedBy: supervisorId, status: 'Pending' };

        if (editingTaskId) {
          // If we're editing an existing task, update it
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
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Assigned To: {task.assignedTo}</p>
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline}</p>
            <p><strong>Blocker:</strong> {task.blocker || 'None'}</p>
            
            {task.blocker && (
              <button onClick={() => handleReactToBlocker(task.id)}>React to Blocker</button>
            )}
            <button onClick={() => handleEditClick(task.id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
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
    </div>
  );
};

export default SupervisorPage;
