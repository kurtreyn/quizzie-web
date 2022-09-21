import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/user';
import Menu from '../components/Menu';
import qzzIcon from '../assets/icon.png';

import '../styles/homeStyle.css';

export default function Home({ isLoggedIn }) {
  const dispatch = useDispatch();
  const { isAuth, userInfo } = useSelector((state) => state.user);

  console.log('userInfo', userInfo, isAuth);

  return (
    <div className="home-container">
      <Menu />
    </div>
  );
}
