// src/components/AddFaculty.jsx
import React, { useState } from "react";
import "./styles/AddFaculty.css";

const BASE_URL = "http://localhost:8000";

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    dept: "",
    psw: "",
    email: "",
    userType: "faculty"
  });
  const [submitMessage, setSubmitMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ text: "Submitting...", type: "info" });

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    console.log(payload);
      const res = await fetch(`${BASE_URL}/addfaculty`, {
        method: "POST",
        credentials: "include",
        body: payload
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitMessage({ text: data.message, type: "success" });
        setFormData({
          name: "",
          designation: "",
          dept: "",
          psw: "",
          email: "",
          userType: "faculty"
        });
      } else {
        setSubmitMessage({ text: data.error || "Failed to add faculty", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({ text: "An error occurred. Please try again.", type: "error" });
    }
  };

  return (
    <div className="add-faculty-container">
      <h3 className="component-title">Add New Faculty</h3>

      {submitMessage.text && (
        <div className={`submit-message ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="faculty-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text" name="designation" value={formData.designation}
              onChange={handleChange} required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <input
              type="text" name="dept" value={formData.dept}
              onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password" name="psw" value={formData.psw}
              onChange={handleChange} required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>User Type</label>
            <select
              name="userType" value={formData.userType}
              onChange={handleChange}
            >
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Add Faculty</button>
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setFormData({
                name: "",
                designation: "",
                dept: "",
                psw: "",
                email: "",
                userType: "faculty"
              });
              setSubmitMessage({ text: "", type: "" });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaculty;
