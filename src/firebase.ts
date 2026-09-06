import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoKydGmZnidTUn5C0tuSg-MoC-5yi1DNc",
  authDomain: "stellar-electron-l09p9.firebaseapp.com",
  projectId: "stellar-electron-l09p9",
  storageBucket: "stellar-electron-l09p9.firebasestorage.app",
  messagingSenderId: "856828477328",
  appId: "1:856828477328:web:f3ead6c878e6118b713d15"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-samuelaprende-f292b3f1-8836-4d19-ad03-a4cb86d3f902");
