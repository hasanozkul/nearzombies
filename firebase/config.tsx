// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOH3reAi4V7n0KC7sEWPGFsYLc7Bntrvg",
  authDomain: "impaytel.firebaseapp.com",
  databaseURL: "https://impaytel.firebaseio.com",
  projectId: "impaytel",
  storageBucket: "impaytel.appspot.com",
  messagingSenderId: "1078239380727",
  appId: "1:1078239380727:web:d7574b8b8d69d8186cbff2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);