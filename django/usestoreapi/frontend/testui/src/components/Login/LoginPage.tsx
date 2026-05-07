import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import './Login.css';
import useAuthStore from '../../store/authStore';
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });
      setToken(response.data.access);
      navigate({ to: '/' });
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login to Your Account</h1>
      <div className="login-form-container">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="login-redirect">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
