import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjDCltC2n-3xO58YjIV7_YN0qdK_QT1H4",
    authDomain: "staff-management-542ca.firebaseapp.com",
    projectId: "staff-management-542ca",
    storageBucket: "staff-management-542ca.firebasestorage.app",
    messagingSenderId: "412959591080",
    appId: "1:412959591080:web:753da3fd5a90027713d09d",
    measurementId: "G-GW9V61YK6D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);