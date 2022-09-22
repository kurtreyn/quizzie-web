import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/user';
import { firebase } from './firebase';
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

  return (
    <BrowserRouter>
      <Nav currentUser={currentUser} />
    </BrowserRouter>
  );
}

export default App;
