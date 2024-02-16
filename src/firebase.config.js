import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEfXbGCl-uFjy_Q9-VpzYw__3BXNAm2tQ",
  authDomain: "house-marketplace-63cf2.firebaseapp.com",
  projectId: "house-marketplace-63cf2",
  storageBucket: "house-marketplace-63cf2.appspot.com",
  messagingSenderId: "978754565333",
  appId: "1:978754565333:web:30ffe242d16388f5fd9e5c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()