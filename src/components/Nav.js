import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import AuthRoute from '../routes/AuthRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';

export default function Nav() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
