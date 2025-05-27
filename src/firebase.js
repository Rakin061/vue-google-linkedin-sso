// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "Enter your API key here",
  authDomain: "Enter your Auth Domain here",
  projectId: "Enter your Project ID here",
  storageBucket: "Enter your Storage Bucket here",
  messagingSenderId: "Enter your Messaging Sender ID here",
  appId: "Enter your App ID here",
  measurementId: "Enter your Measurement ID here"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
