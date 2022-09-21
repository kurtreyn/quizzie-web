import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

function App() {
  const [token, setToken] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getAuth = () => {
    setToken(localStorage.getItem('token'));
    setCredentials(localStorage.getItem('credentials'));
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    setIsLoggedIn(true);
  }, [token]);

  // console.log('isLoggedIn', isLoggedIn);

  return (
    <BrowserRouter>
      <Main token={token} credentials={credentials} isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  );
}

export default App;
