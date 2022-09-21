import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoute from '../routes/AuthRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import '../styles/mainStyle.css';

export default function Main() {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <div className="main-container">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route
          exact
          path="/"
          element={
            <AuthRoute isAuth={isAuth}>
              <Route exact path="/" element={<Home isAuth={isAuth} />} />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}
