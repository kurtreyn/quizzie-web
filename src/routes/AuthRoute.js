import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthRoute({ currentUser, children }) {
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
