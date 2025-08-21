// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "<ENTER_YOUR_FIREBASE_API_KEY>",
  authDomain: "<ENTER_YOUR_FIREBASE_AUTH_DOMAIN>",
  projectId: "<ENTER_YOUR_FIREBASE_PROJECT_ID>",
  storageBucket: "<ENTER_YOUR_FIREBASE_STORAGE_BUCKET>",
  messagingSenderId: "<ENTER_YOUR_FIREBASE_MESSAGING_SENDER_ID>",
  appId: "<ENTER_YOUR_FIREBASE_APP_ID>",
  measurementId: "<ENTER_YOUR_FIREBASE_MEASUREMENT_ID>"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
