import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Menu from '../components/Menu';
import quizzieLogo from '../assets/icon.png';
import '../styles/signupStyle.css';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function signupUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function handleSignup() {
    setLoading(true);
    try {
      await signupUser(email, password);
    } catch (error) {
      console.log(error);
      alert('Error');
    }
    setLoading(false);
    navigate('/login');
  }

  return (
    <div className="signup-container">
      <div className="signup-header">
        <Menu />
      </div>

      <div className="signup-body">
        <div className="left-body">
          <div className="welcome-section">
            <img src={quizzieLogo} alt="logo" className="signup-logo" />
          </div>
        </div>
        <div className="right-body">
          <form action="" className="signup-form">
            <input
              type="text"
              placeholder="email"
              className="signup-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="signup-input signup-input-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="signup-button"
              disabled={loading}
              onClick={handleSignup}
            >
              <span className="signup-button-text">signup</span>
            </button>

            <div className="form-footer">
              <span className="form-footer-text">Already have an account?</span>
              <a href="/login" className="form-footer-text link-text">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
