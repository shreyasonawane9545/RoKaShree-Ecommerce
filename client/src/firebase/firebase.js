import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCSt566aVUjt1yIXDxTexmb6wbANMjwCYU",
  authDomain: "rokashree-c324b.firebaseapp.com",
  projectId: "rokashree-c324b",
  storageBucket: "rokashree-c324b.firebasestorage.app",
  messagingSenderId: "418727146588",
  appId: "1:418727146588:web:c899639ec520e7f317e299",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);



export default app;





