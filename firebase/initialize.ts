// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpohu4YkhEHC5hT1IZ3FYfk7SII7Jd3v0",
  authDomain: "my-resto-f3d07.firebaseapp.com",
  projectId: "my-resto-f3d07",
  storageBucket: "my-resto-f3d07.firebasestorage.app",
  messagingSenderId: "278994602076",
  appId: "1:278994602076:web:53243d8a9df55323817e99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
