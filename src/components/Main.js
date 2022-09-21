import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoute from '../routes/AuthRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';

import '../styles/mainStyle.css';

export default function Main({ isLoggedIn }) {
  return (
    <div className="main-container">
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route exact path="users/login" element={<Login />} />

        <Route
          exact
          path="/project_settings"
          element={
            <AuthRoute isLoggedIn={isLoggedIn}>
              {/* <ProjectSettings
                isLoggedIn={isLoggedIn}
                credentials={credentials}
              /> */}
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}
