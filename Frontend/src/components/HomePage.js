import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logSvg from '../assets/log.svg';
import registerSvg from '../assets/register.svg';
import axios from '../services/axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login handler
  const login = async () => {
    try {
      const res = await axios.post(`http://localhost:8888/api/users/login`, { emailId, password });
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  // Register handler
 const register = async (e) => {
   e.preventDefault();
   try {
     await axios.post(`http://localhost:8888/api/users`, {
       name,
       emailId,
       password
     });

     alert('Registered successfully');

     // Clear fields
     setName('');
     setEmail('');
     setPassword('');

     // Switch back to login
     const container = document.querySelector('.container');
     container?.classList.remove('sign-up-mode');
   } catch (err) {
     if (err.response && err.response.status === 409) {
       alert('A user with this email ID already exists.');
     } else {
       alert('Registration failed. Please try again.');
     }
     console.error(err);
   }
 };


  useEffect(() => {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    const handleSignUp = () => container?.classList.add('sign-up-mode');
    const handleSignIn = () => container?.classList.remove('sign-up-mode');

    sign_up_btn?.addEventListener('click', handleSignUp);
    sign_in_btn?.addEventListener('click', handleSignIn);

    return () => {
      sign_up_btn?.removeEventListener('click', handleSignUp);
      sign_in_btn?.removeEventListener('click', handleSignIn);
    };
  }, []);

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">

          {/* --------- Sign In --------- */}
          <form className="sign-in-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" onClick={login} />
            <p
              className="social-text"
              onClick={() => document.querySelector('#sign-up-btn')?.click()}
              role="button"
              tabIndex={0}
            >
              Don’t have an account?
            </p>
          </form>

          {/* --------- Sign Up --------- */}
          <form className="sign-up-form" onSubmit={register}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      {/* --------- Panels --------- */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Sign up and start your journey</p>
            <button className="btn transparent" id="sign-up-btn">Sign up</button>
          </div>
          <img src={logSvg} className="image" alt="sign in" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already a member?</h3>
            <p>Login to your account</p>
            <button className="btn transparent" id="sign-in-btn">Sign in</button>
          </div>
          <img src={registerSvg} className="image" alt="sign up" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
