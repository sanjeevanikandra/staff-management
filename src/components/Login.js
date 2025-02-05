// import React, { useState } from 'react'
// import { auth } from '../firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const userId = user.uid;
//       alert('User logged in successfully');

//       const response = await fetch(`http://localhost:5000/users/${userId}`);
//       const data = await response.json();
//       const userEmployeeType = data.role;

//       if (userEmployeeType === 'Admin') {
//         navigate('/admin');
//       }else if (userEmployeeType === 'Supervisor') {
//         navigate('/supervisor');
//       }else {
//         navigate('/staff');
//       }

//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <h1>Login</h1>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter Email"
//           required
//         />
//         <div>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder='Enter password'
//             required
//           />
//           <span
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "Hide" : "Show"}
//           </span>
//         </div>
//         <button type="submit">Login</button>
//         <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
//       </form>
//     </div>
//   )
// }

// export default Login


///////////////with id wala/////////////
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Fetch users from your JSON Server (db.json)
//       const response = await axios.get('http://localhost:5000/users');
//       const users = response.data;
  
//       // Check if the credentials match any user in the DB
//       const user = users.find((user) => user.email === email && user.password === password);
//       if (user) {
//         // If user found, navigate based on the role
//         if (user.role === 'Admin') {
//           navigate('/admin');
//         } else if (user.role === 'Supervisor') {
//           navigate(`/supervisor/${user.id}`); // Correct ID for supervisor
//         } else if (user.role === 'Staff') {
//           navigate(`/staff/${user.id}`); // Correct ID for staff
//         }
//       } else {
//         alert('Invalid credentials');
//       }
//     } catch (error) {
//       alert('Error during login: ' + error.message);
//     }
//   };
  

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <h1>Login</h1>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter Email"
//           required
//         />
//         <div>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//             required
//           />
//           <span
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "Hide" : "Show"}
//           </span>
//         </div>
//         <button type="submit">Login</button>
//         <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
//       </form>
//     </div>
//   );
// }

// export default Login;



////////////try with id aur role ////////////////
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      // Fetch user data from the json-server based on the userId
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const data = await response.json();
      const userRole = data.role;

      // Depending on the user role, navigate to the appropriate page
      if (userRole === 'Admin') {
        navigate('/admin');
      } else if (userRole === 'Supervisor') {
        navigate(`/supervisor/${userId}`); // Pass userId as URL parameter
      } else {
        navigate(`/staff/${userId}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
      </form>
    </div>
  );
}

export default Login;
