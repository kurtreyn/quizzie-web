import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import Menu from '../components/Menu';
import qzzLogo from '../assets/icon.png';
import Button from '../components/Button';
import '../styles/loginStyle.css';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, password).then(setLoading(false)).then(navigate('/'));
    } catch (error) {
      console.log(error.message);
      alert('Error', error);
    }
  }

  function signupUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function handleSignup() {
    try {
      setLoading(true);
      await signupUser(email, password)
        .then(
          alert(
            'Signup Successful. Now just enter your username & password and click the Login button'
          )
        )
        .then(setLoading(false))
        .then(setMode('login'));
    } catch (error) {
      console.log(error);
      alert('Error', error.message);
    }
  }

  const handleMode = () => {
    if (mode === 'login') {
      setMode('signup');
    }
    if (mode === 'signup') {
      setMode('login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Menu />
      </div>

      <div className="login-body">
        <div className="left-body">
          <div className="welcome-section">
            <img src={qzzLogo} alt="logo" className="login-logo" />
          </div>
        </div>
        <div className="right-body">
          <form action="" className="login-form">
            <input
              type="text"
              placeholder="user name"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="login-input login-input-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {mode === 'login' && (
              <Button
                btnType="login"
                label="Login"
                type="submit"
                onClick={handleLogin}
              />
            )}

            {mode === 'signup' && (
              <Button
                btnType="signup"
                label="Signup"
                type="submit"
                onClick={handleSignup}
              />
            )}

            <div className="form-footer">
              <span className="form-footer-text">Don't have an account?</span>
              <span className="form-footer-text link-text" onClick={handleMode}>
                {mode === 'login' ? 'Signup' : 'Login'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
