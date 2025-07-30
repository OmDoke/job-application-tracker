import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login error');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p onClick={() => navigate('/register')}>Don't have an account? Register</p>
    </div>
  );
}

export default HomePage;
