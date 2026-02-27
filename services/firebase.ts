
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJrRdasbJBw025qZ9twB_4gqkVPLY6nTY",
  authDomain: "gvdroptaxi.firebaseapp.com",
  projectId: "gvdroptaxi",
  storageBucket: "gvdroptaxi.firebasestorage.app",
  messagingSenderId: "1039878628667",
  appId: "1:1039878628667:web:9e7bda7edd9c2f2a3a431e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
