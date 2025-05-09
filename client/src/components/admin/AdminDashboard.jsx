import React from "react";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const linkStyle = {
    display: "block",
    margin: "10px 0",
    color: "black",
    textDecoration: "none",
    fontWeight: "bold"
  };

  const containerStyle = {
    background: "bisque",
    padding: "20px",
    minHeight: "400px"
  };

  return (
    <div className="col-2" style={containerStyle}>
      <a href="/viewNews" style={linkStyle}>View News</a>
      <a href="/viewalumni" style={linkStyle}>View Alumni</a>
      <a href="/addfaculty" style={linkStyle}>Add Faculty</a>
      <a href="/facultylist" style={linkStyle}>View Faculty</a>
      <a href="/logout" style={linkStyle}>Logout</a>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Admin Dashboard</h2>
      <div className="row" style={{ margin: "20px 100px" }}>
        <AdminMenu />
        <div className="col-10" style={{ textAlign: "center", padding: "20px" }}>
          <strong>Welcome to DAV PG College Admin Panel</strong>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
