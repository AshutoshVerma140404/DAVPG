import React from 'react';
import './AdminDashboard.css';
// import AdminMenu from './AdminMenu'; // Uncomment if you have a separate AdminMenu component

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-row">
        {/* Replace the following div with <AdminMenu /> if it's componentized */}
        <div className="admin-menu">
          {/* Admin menu content goes here if not a separate component */}
        </div>
        <div className="admin-main">
          <b>Welcome to DAV PG College Admin Panel</b>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
