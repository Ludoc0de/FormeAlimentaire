import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4qASx0eBug_hmD7oJOsoHTtkEg1qfwkY",
  authDomain: "formealimentaire.firebaseapp.com",
  projectId: "formealimentaire",
  storageBucket: "formealimentaire.appspot.com",
  messagingSenderId: "246144584831",
  appId: "1:246144584831:web:758884a1f94e5320ea434a",
  measurementId: "G-HMDKPFH5EP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getFirestore(app);
