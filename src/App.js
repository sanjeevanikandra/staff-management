import React from 'react';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import AddminBoard from './components/AddminBoard';
import StaffBoard from './components/StaffBoard';
import SupervisorBoard from './components/SupervisorBoard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AddminBoard />} />
        <Route path="/staff" element={<StaffBoard />} />
        <Route path="/supervisor" element={<SupervisorBoard />} />
      </Routes>
    </Router>
  )
}

export default App
