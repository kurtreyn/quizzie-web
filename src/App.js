import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUserDispatch, setUserAuth } from './redux/user';
import Nav from './components/Nav';
import './styles/appStyle.css';

function App() {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));

      return unsub;
    }, []);

    return currentUser;
  }

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUserDispatch(currentUser));
      dispatch(setUserAuth(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );
}

export default App;
