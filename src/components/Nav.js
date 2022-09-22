import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoute from '../routes/AuthRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';

export default function Nav({ isLoggedIn }) {
  const { current_user } = useSelector((state) => state.user);

  const AuthWrapper = ({ isLoggedIn }) => {
    return isLoggedIn ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    // <Routes>
    //   {current_user && <Route path="/" element={<Home />} />}
    //   {!current_user && (
    //     <>
    //       <Route path="/signup" element={<Signup />} />
    //       <Route path="/login" element={<Login />} />
    //     </>
    //   )}
    // </Routes>

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<AuthWrapper isLoggedIn={isLoggedIn} />} />
    </Routes>
  );
}
