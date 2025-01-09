import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvLHcj0rwXq_3CieUocO_qt426XhSos7w",
  authDomain: "olx-clone-9f19a.firebaseapp.com",
  projectId: "olx-clone-9f19a",
  storageBucket: "olx-clone-9f19a.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "930114600252",
  appId: "1:930114600252:web:b2bf6e442923f186f4b239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app); // Add Firebase Storage
const db = getFirestore(app);    // Add Firestore

export { auth, googleProvider, storage, db };
