import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
 

const firebaseConfig = {
    apiKey: "AIzaSyD09LQdj9NSE4VFx6aJh6TPmZAeTEgeqX4",
    authDomain: "booking-system-eac7a.firebaseapp.com",
    projectId: "booking-system-eac7a",
    storageBucket: "booking-system-eac7a.appspot.com",
    messagingSenderId: "432116330885",
    appId: "1:432116330885:web:066b7044a7b5eb56c794ec",
    measurementId: "G-0MWJS3EWM9"
  };

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app);
export const auth = getAuth(app);