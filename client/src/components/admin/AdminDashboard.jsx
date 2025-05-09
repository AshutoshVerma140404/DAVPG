// src/components/AdminDashboard.jsx
import React, { useState } from "react";
import ViewAlumni from "./Viewalumni";
import ViewNews from "./ViewNews";
import AddFaculty from "./Addfaculty";
import FacultyList from "./Facultylist";
import { useNavigate } from "react-router-dom";
import { LogOut, Router } from "lucide-react";
import "./styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("welcome");
  const navigate = useNavigate();
  // Function to render the appropriate component based on activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case "viewNews":
        return <ViewNews />;
      case "viewAlumni":
        return <ViewAlumni />;
      case "addFaculty":
        return <AddFaculty />;
      case "facultyList":
        return <FacultyList />;
     
    }
  };

const handleLogout = async () => {
  console.log("Logging out...");

  try {
    const res = await fetch("http://localhost:8000/logout", {
      method: "GET",
      credentials: "include", // Important for cookie/session-based auth
    });

    if (res.ok) {
      console.log("Logout successful");
      Router.clear(); // Clear any stored user data if needed
      navigate("/"); // Or use window.location.href = "/" if needed
    } else {
      console.error("Logout failed", res.status);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};


  // Menu items configuration
  const menuItems = [
    { id: "viewNews", label: "View News", icon: "📰" },
    { id: "viewAlumni", label: "View Alumni", icon: "👨‍🎓" },
    { id: "addFaculty", label: "Add Faculty", icon: "👨‍🏫" },
    { id: "facultyList", label: "View Faculty", icon: "📋" }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header with logout button */}
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          <LogOut size={16} className="logout-icon" />
          Logout
        </button>
      </header>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`menu-item ${activeComponent === item.id ? "active" : ""}`}
                onClick={() => setActiveComponent(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content area */}
        <div className="dashboard-content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;