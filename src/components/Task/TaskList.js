// import React from "react";

// const TaskList = ({ tasks, deleteTask, updateTask }) => {
//   const handleUpdate = (task) => {
//     const updatedTask = { ...task, status: "Completed" };
//     updateTask(updatedTask);
//   };

//   return (
//     <div>
//       <h2>Task List</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             style={{
//               marginBottom: "15px",
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "5px",
//             }}
//           >
//             <p>Task: {task.task}</p>
//             <p>Assigned To: Staff ID {task.staffId}</p>
//             <p>
//               Status:{" "}
//               <span
//                 style={{
//                   color: task.status === "Completed" ? "green" : "orange",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {task.status}
//               </span>
//             </p>
//             <button onClick={() => handleUpdate(task)}>Mark Completed</button>
//             <button
//               onClick={() => {
//                 if (window.confirm("Are you sure you want to delete this task?")) {
//                   deleteTask(task.id);
//                 }
//               }}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskList;


import React from "react";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const handleUpdate = (task) => {
    const updatedTask = { ...task, status: "Completed" };
    updateTask(updatedTask);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <p>Task: {task.task}</p>
            <p>Assigned To: Staff ID {task.staffId}</p>
            <p>
              Status:{" "}
              <span
                style={{
                  color: task.status === "Completed" ? "green" : "orange",
                  fontWeight: "bold",
                }}
              >
                {task.status}
              </span>
            </p>
            <button onClick={() => handleUpdate(task)}>Mark Completed</button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this task?")) {
                  deleteTask(task.id, task.staffId);
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
