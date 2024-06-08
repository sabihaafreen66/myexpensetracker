import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
        apiKey: "AIzaSyDmY5uCI7XrkQvV77sTM_22WAvHJGmF2Y4",
        authDomain: "testproject-84f8d.firebaseapp.com",
        projectId: "testproject-84f8d",
        storageBucket: "testproject-84f8d.appspot.com",
        messagingSenderId: "751898012166",
        appId: "1:751898012166:web:307184ee42068bb748b187",
        measurementId: "G-Q1249FCJXP"
    };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db,app,getAuth, updateProfile, setDoc, doc, sendEmailVerification };