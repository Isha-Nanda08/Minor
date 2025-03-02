// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHBV20wKg93U8xEw7QwP--0KxR_DesDWE",
  authDomain: "career-connect-708a9.firebaseapp.com",
  projectId: "career-connect-708a9",
  storageBucket: "career-connect-708a9.firebasestorage.app",
  messagingSenderId: "843545266768",
  appId: "1:843545266768:web:c90feae544d589ddb25f55",
  measurementId: "G-4HRH2HG281"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);