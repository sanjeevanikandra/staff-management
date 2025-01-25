import React from 'react';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './pages/Home';
import AddminBoard from './pages/AddminBoard';
import StaffBoard from './pages/StaffBoard';
import Superviser from './components/Supervisor_dashboard/Supervisor'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AddminBoard />} />
        <Route path="/staff" element={<StaffBoard />} />
        <Route path="/superwiser" element={<Superviser />} />
      </Routes>
    </Router>
  )
}

export default App
