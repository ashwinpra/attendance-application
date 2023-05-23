// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from 'firebase/firestore';
import {getAuth} from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyAYanNj0zy02KKVOBz4NAze2nob8JabLtk",
  authDomain: "swe-attendance.firebaseapp.com",
  projectId: "swe-attendance",
  storageBucket: "swe-attendance.appspot.com",
  messagingSenderId: "290391420379",
  appId: "1:290391420379:web:7a87e94920b19f3ccbcbfe",
  measurementId: "G-JWTF82KDMC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
