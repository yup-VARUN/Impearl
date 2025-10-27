import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Existing imports
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginPage from "./pages/login_page";
import ClientSignup from "./pages/client_signup";
import ClientDashboard from "./pages/client_dashboard";
import FreelancerSignup from "./pages/freelancer_signup";
import FreelancerDashboard from "./pages/freelancer_dashboard";

// ✅ NEW import for the demo feature
import Marketplace from "./pages/Marketplace";

function App() {
  return (
    <Router>
      <div>
        {/* ✅ Navbar */}
        <div className="navbar">
          <Link to="/">
            <img src="impearl_logo.png" alt="Logo" style={{ height: "65px" }} />
          </Link>
          <div className="navbar-links">
            <Link to="/about">About</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            {/* ✅ Add Marketplace button for demo */}
            <Link to="/marketplace">Marketplace</Link>
          </div>
        </div>

        {/* ✅ Routes */}
        <Routes>
          {/* General pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Registration and login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/client_signup" element={<ClientSignup />} />
          <Route path="/freelancer_signup" element={<FreelancerSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_page" element={<LoginPage />} />

          {/* Dashboards */}
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />

          {/* ✅ Marketplace demo route */}
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
