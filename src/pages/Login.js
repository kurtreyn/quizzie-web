import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
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
  const [hasError, setHasError] = useState(false);
  const actionCodeSettings = {
    url: 'https://qzzweb.netlify.app',
  };

  function checkForErrors() {
    if (!email || email === '') {
      setHasError(true);
      alert('Must provide a valid email address');
      resetForm();
    } else if (!email.includes('@')) {
      setHasError(true);
      alert('Email address must contain @ symbol');
      resetForm();
    } else if (!password || password === '') {
      setHasError(true);
      alert('Must provide a password');
      resetForm();
    }
  }

  function signIn(email, password) {
    checkForErrors();
    if (!hasError) {
      return signInWithEmailAndPassword(auth, email, password);
    } else {
      resetForm();
    }
  }

  function signupUser(email, password) {
    checkForErrors();
    if (!hasError) {
      return createUserWithEmailAndPassword(auth, email, password);
    } else {
      resetForm();
    }
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setHasError(false);
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

  async function handleSignup() {
    try {
      setLoading(true);
      await signupUser(email, password)
        .then(setLoading(false))
        .then(
          alert(
            'Signup Successful. Now just enter your username & password and click the Login button'
          )
        )
        .then(setMode('login'));
    } catch (error) {
      console.log(error);
      alert('Error', error.message);
    }
  }

  console.log('ERROR PRESENT:', hasError);

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(
        alert(
          'An email with a password reset has been sent. You may need to check the Spam folder.'
        )
      )
      .catch((error) => {
        console.log(error.message);
      });
  };

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
              placeholder="email"
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
                disabled={hasError}
                onClick={handleLogin}
              />
            )}

            {mode === 'signup' && (
              <Button
                btnType="signup"
                label="Signup"
                type="submit"
                disabled={hasError}
                onClick={handleSignup}
              />
            )}

            <div className="form-footer">
              <div className="signup-link-wrapper">
                <span className="form-footer-text">Don't have an account?</span>
                <span
                  className="form-footer-text link-text"
                  onClick={handleMode}
                >
                  {mode === 'login' ? 'Signup' : 'Login'}
                </span>
              </div>
              <div className="forgot-password-container">
                <span className="form-footer-text">Forgot your password?</span>
                <span
                  className="form-footer-text link-text"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
