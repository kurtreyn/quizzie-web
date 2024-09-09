import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setCurrentUserDispatch, setUserAuth } from "../redux/user";
import qzzIcon from "../assets/icon.png";
import "../styles/menuStyle.css";

export default function Menu({ handleCancelCreateQuiz }) {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        alert("Signout successful");
      })
      .then(dispatch(setCurrentUserDispatch(null)))
      .then(dispatch(setUserAuth(false)))
      .then(() => navigate("/login"))
      .catch((error) => {
        console.log("signout error:", error);
      });
  };

  return (
    <div className="menu-container">
      <div className="left-menu">
        <img
          src={qzzIcon}
          alt="logo"
          className="menu-icon"
          onClick={handleCancelCreateQuiz}
        />
      </div>
      <div className="right-menu">
        <div className="menu-options-wrapper">
          {isAuth && (
            <span className="menu-text" onClick={handleSignout}>
              Sign Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
