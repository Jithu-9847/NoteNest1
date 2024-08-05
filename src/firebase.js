// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Send the token to the client
// ...

const firebaseConfig = {
    apiKey: "AIzaSyCHRHj59Z-Q-esM_cOwQ5NUUyD31nCfBw0",
    authDomain: "note-nest-170f0.firebaseapp.com",
    projectId: "note-nest-170f0",
    storageBucket: "note-nest-170f0.appspot.com",
    messagingSenderId: "912118102807",
    appId: "1:912118102807:web:030071436f3cc644ca1552"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
 
export { db,storage };
