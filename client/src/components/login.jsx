import React, { useState } from 'react';
import './styles/Login.css';

const Login = () => {
  const [message, setMessage] = useState(false); // Simulated state for error

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate failed login for demonstration (you can replace this with actual login logic)
    setMessage(true);
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-heading">Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <button type="submit" style={{ marginTop: '25px' }}><b>Login</b></button>
        </div>

        <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
          <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>

      {message && (
        <script>
          {`alert("Enter Correct UserId and Password")`}
        </script>
      )}
    </div>
  );
};

export default Login;
