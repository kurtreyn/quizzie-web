import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoute from '../routes/AuthRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';

export default function Nav({ currentUser }) {
  const { current_user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route element={<AuthRoute currentUser={currentUser} />}>
        <Route element={<Home />} path="/" exact />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
