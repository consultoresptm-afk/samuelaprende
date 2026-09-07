import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXKIqzAPBeL1BB1eYbCh0iXAlk1UmMW7o",
  authDomain: "samuelaprende-1061e.firebaseapp.com",
  projectId: "samuelaprende-1061e",
  storageBucket: "samuelaprende-1061e.firebasestorage.app",
  messagingSenderId: "229623339292",
  appId: "1:229623339292:web:f0aea23ed0d1c19b4142d9",
  measurementId: "G-NCKLTDM3YR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
