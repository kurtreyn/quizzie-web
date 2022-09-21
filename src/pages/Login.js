import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { url, protocol } from '../shared/sharedData';
// import '../styles/loginStyle.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-header-text">Login</h1>
      </div>

      <div className="login-body">
        <form action="" className="login-form">
          <input
            type="text"
            placeholder="user name"
            className="login-input"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="login-input login-input-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          className="login-button"
          disabled={loading}
          //   onClick={handleLogin}
        >
          <span className="login-button-text">Login</span>
        </button>
      </div>
    </div>
  );
}
