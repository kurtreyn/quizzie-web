import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,

  apiKey: 'AIzaSyBZkrQ8x-gndC3634T2y3Ngy4lbQgJbS04',
  authDomain: 'quizie-cee07.firebaseapp.com',
  projectId: 'quizie-cee07',
  storageBucket: 'quizie-cee07.appspot.com',
  messagingSenderId: '381651959521',
  appId: '1:381651959521:web:a114cd592308419b3641a0',
  measurementId: 'G-HJTG874DF0',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getDatabase();
