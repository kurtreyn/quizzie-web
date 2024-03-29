import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Nav() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
