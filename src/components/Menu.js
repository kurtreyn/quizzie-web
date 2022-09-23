import React from 'react';
import { useSelector } from 'react-redux';
import qzzIcon from '../assets/icon.png';
import '../styles/menuStyle.css';

export default function Menu() {
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
