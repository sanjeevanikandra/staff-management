import React from 'react';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './pages/Home';
import AddminBoard from './pages/AddminBoard';
import StaffBoard from './pages/StaffBoard';
import SupervisorBoard from './pages/SupervisorBoard';


function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Navbar />}/>
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
