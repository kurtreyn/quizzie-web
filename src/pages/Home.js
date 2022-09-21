import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/user';
// import '../styles/homeStyle.css';

export default function Home({ isLoggedIn }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  const handleAuth = () => {
    console.log('click');
    dispatch(setUserAuth(true));
  };

  console.log('isAuth', isAuth);

  let isTrue = 'True';
  let isFals = 'False';

  return (
    <div className="home-container">
      <div className="text-container">
        <button onClick={handleAuth}>Set Auth</button>
        <span className="auth">isAuth: {isAuth ? isTrue : isFals}</span>
      </div>
    </div>
  );
}
