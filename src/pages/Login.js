import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth, setUserInfo } from '../redux/user';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Menu from '../components/Menu';
import quizzieLogo from '../assets/icon.png';
import '../styles/loginStyle.css';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isAuth, userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error.message);
      alert('Error');
    }
    setLoading(false);
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <Menu />
      </div>

      <div className="login-body">
        <div className="left-body">
          <div className="welcome-section">
            <img src={quizzieLogo} alt="logo" className="login-logo" />
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
            <button
              className="login-button"
              disabled={loading}
              onClick={handleLogin}
            >
              <span className="login-button-text">Login</span>
            </button>

            <div className="form-footer">
              <span className="form-footer-text">Don't have an account?</span>
              <a href="/signup" className="form-footer-text link-text">
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
