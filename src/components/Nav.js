import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoute from '../routes/AuthRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Nav({ currentUser }) {
  return (
    <Routes>
      <Route element={<AuthRoute currentUser={currentUser} />}>
        <Route element={<Home />} path="/" exact />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
