import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const emailprovider = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
const signinprovider = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
const gmailprovider = new GoogleAuthProvider();
const popup = (gmailprovider) => signInWithPopup(auth, gmailprovider);
export { auth, emailprovider, signinprovider, gmailprovider, popup };
