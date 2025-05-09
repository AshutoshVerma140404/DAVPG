import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

export default function Login() {
  const [uname, setUname] = useState('');
  const [psw, setPsw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  const login = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!uname.trim() || !psw.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:8000/login_auth', {
        method: 'POST',
        credentials: "include", 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname, psw }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Store user info in localStorage or context if needed
        // localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/AdminDashboard');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h2>Login to Dashboard</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={login} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={psw}
                onChange={(e) => setPsw(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button 
                type="button" 
                className="show-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          
          <div className="form-options">
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}