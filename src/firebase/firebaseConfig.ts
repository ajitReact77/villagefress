// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider,RecaptchaVerifier } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { connectFirestoreEmulator } from 'firebase/firestore';
import { products } from "../data/products";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKQSBMUGnzEQkKTpcbsdVRJBAdbbPx5J8",
  authDomain: "villagefress.firebaseapp.com",
  projectId: "villagefress",
  storageBucket: "villagefress.appspot.com",
  messagingSenderId: "137619969533",
  appId: "1:137619969533:web:16e81dd66da680a9b7b594",
  measurementId: "G-EYC469WREV"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Export your services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Point Firestore to emulator
