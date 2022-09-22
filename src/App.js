import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/user';
import { firebase } from './firebase';
import Nav from './components/Nav';
import './styles/appStyle.css';

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userHandler = (user) => {
    if (user) {
      dispatch(setCurrentUser(user));
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => userHandler(user));
  }, []);

  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  );
}

export default App;
