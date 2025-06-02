// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9zuzFt50lDQ4b6lrQWT9A4y7YsS6-sSU",
  authDomain: "m-ko-c9a98.firebaseapp.com",
  projectId: "m-ko-c9a98",
  storageBucket: "m-ko-c9a98.firebasestorage.app",
  messagingSenderId: "947748589505",
  appId: "1:947748589505:web:cb825a3ead6e8912692940",
  measurementId: "G-KLF4SLJLSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore(app)
export default app