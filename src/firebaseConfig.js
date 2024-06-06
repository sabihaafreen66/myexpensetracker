// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmY5uCI7XrkQvV77sTM_22WAvHJGmF2Y4",
    authDomain: "testproject-84f8d.firebaseapp.com",
    projectId: "testproject-84f8d",
    storageBucket: "testproject-84f8d.appspot.com",
    messagingSenderId: "751898012166",
    appId: "1:751898012166:web:307184ee42068bb748b187",
    measurementId: "G-Q1249FCJXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
