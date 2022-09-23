import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZkrQ8x-gndC3634T2y3Ngy4lbQgJbS04',
  authDomain: 'quizie-cee07.firebaseapp.com',
  projectId: 'quizie-cee07',
  storageBucket: 'quizie-cee07.appspot.com',
  messagingSenderId: '381651959521',
  appId: '1:381651959521:web:a114cd592308419b3641a0',
  measurementId: 'G-HJTG874DF0',
};

// init firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
// init services
export const db = getFirestore();
