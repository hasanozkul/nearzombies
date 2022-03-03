// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmBoILl7w-Nzb44B8LK7fntP0rnuYPNW0",
  authDomain: "nearzombies-71d86.firebaseapp.com",
  databaseURL: "https://nearzombies-71d86-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nearzombies-71d86",
  storageBucket: "nearzombies-71d86.appspot.com",
  messagingSenderId: "429312208945",
  appId: "1:429312208945:web:633fc280d2c912b57b2510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);