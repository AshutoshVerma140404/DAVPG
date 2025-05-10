// src/components/AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, Router } from "lucide-react";
const FacultyDashboard = () => {
    const navigate = useNavigate();
useEffect(() => {
  const verifySession = async () => {
    try {
      const res = await fetch("http://localhost:8000/checkAdminSession", {
        credentials: "include"
      });
      if (!res.ok) {
        if(!res.type==="faculty")
        navigate("/login"); // Redirect to login if not authenticated
      }
    } catch (err) {
      console.error("Session check failed:", err);
      navigate("/login");
    }
  };

  verifySession();
}, []);
const handleLogout = async () => {
  console.log("Logging out...");

  try {
    const res = await fetch("http://localhost:8000/logout", {
      method: "GET",
      credentials: "include", // Important for cookie/session-based auth
    });

    if (res.ok) {
      console.log("Logout successful");
      //Router.clear(); // Clear any stored user data if needed
      navigate("/"); // Or use window.location.href = "/" if needed
    } else {
      console.error("Logout failed", res.status);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};
  return (
    <div className="admin-dashboard">
<header className="dashboard-header">
        <h2>Faculty Dashboard</h2>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          <LogOut size={16} className="logout-icon" />
          Logout
        </button>
      </header>
        <h1>hiu</h1>
    </div>
  );
};

export default FacultyDashboard;