import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/user';
import qzzIcon from '../assets/icon.png';
import '../styles/menuStyle.css';

export default function Menu() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  return (
    <div className="menu-container">
      <div className="left-menu">
        <img src={qzzIcon} alt="logo" className="menu-icon" />
      </div>
      <div className="right-menu">
        <div className="menu-options-wrapper">
          {isAuth && <span className="menu-text">Logout</span>}
        </div>
      </div>
    </div>
  );
}
