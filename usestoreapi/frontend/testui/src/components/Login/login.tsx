import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router'
import './Login.css';
import useAuthStore from '../../store/authStore';
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useAuthStore();
  const navigate = useNavigate()
  const handleLogin = async (e: any) => {
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
      setToken(response.data.access)
      navigate({ to: '/' })
    } catch (err) {
      alert(err)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
