import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth"

const firebaseConfig = {

  apiKey: "AIzaSyCilH8jOJK4Q3kYxAcRgDIINux5xaAd27A",

  authDomain: "final-capstone-assessment.firebaseapp.com",

  projectId: "final-capstone-assessment",

  storageBucket: "final-capstone-assessment.appspot.com",

  messagingSenderId: "804488964950",

  appId: "1:804488964950:web:24dad1cb3cb98f7818c4f7",

  measurementId: "G-PF98VW1WQC"

};


export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);