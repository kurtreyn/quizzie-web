import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebase, db } from '../firebase';
import Menu from '../components/Menu';
import quizzieLogo from '../assets/icon.png';
import profileAvatar from '../assets/profile-avatar.png';
import '../styles/signupStyle.css';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (email, username, password) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('Firebas user created successfully');
      db.collection('users')
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: profileAvatar,
          photoURL: profileAvatar,
        })
        .then(() => navigate('/login'));
    } catch (error) {
      console.log(error.message);
    }
  };

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
              type="text"
              placeholder="user name"
              className="signup-input"
              onChange={(e) => setUserName(e.target.value)}
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
