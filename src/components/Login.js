import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
      alert('User logged in successfully');

      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const data = await response.json();
      const userEmployeeType = data.role;

      if (userEmployeeType === 'Admin') {
        navigate('/admin');
      }else if (userEmployeeType === 'Supervisor') {
        navigate('/supervisor');
      }else {
        navigate('/staff');
      }

    } catch (error) {
      alert(error.message);
    }
  }

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
            placeholder='Enter password'
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
      </form>
    </div>
  )
}

export default Login
