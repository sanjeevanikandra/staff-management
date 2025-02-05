import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Home from "./pages/Home";
import AdminBoard from "./pages/AddminBoard";
import StaffBoard from "./pages/StaffBoard";
import Supervisor from "./pages/Supervisor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminBoard />} />
        <Route path="/supervisor/:userId" element={<Supervisor />} />
        <Route path="/staff/:userId" element={<StaffBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
