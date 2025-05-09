import React from 'react';
import './AddFaculty.css';

const AddFaculty = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form data submission here
  };

  return (
    <div className="containerform">
      {/* Replace with <AdminMenu /> if componentized */}
      <div className="form-container">
        <h1 className="heading11">Add Faculty</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"><b>Name</b></label>
          <input type="text" placeholder="Enter Name" name="name" required />

          <label htmlFor="email"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="email" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <div className="option-menu">
            <div className="dpt">
              <label htmlFor="dept"><b>Department</b></label>
              <select name="dept" id="dept">
                <option value="Faculty of Arts">Arts</option>
                <option value="Faculty of Commerce">Commerce</option>
                <option value="Faculty of Education">Education</option>
                <option value="Faculty of Science">Science</option>
              </select>
            </div>
          </div>

          <div className="dpt">
            <label htmlFor="userType"><b>Type of User</b></label>
            <select name="userType" id="userType">
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="departmentAdmin">Department Admin</option>
            </select>
          </div>

          <div className="dpt">
            <label htmlFor="designation"><b>Designation</b></label>
            <select name="designation" id="designation">
              <option value="Professor">Professor</option>
              <option value="Assitant Professor">Assitant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
