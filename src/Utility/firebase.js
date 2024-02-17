
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";


// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSlYyRQhhZjeqzjv6uyhdVQtvQqJz4Qdk",
  authDomain: "shopping-clone-c199a.firebaseapp.com",
  projectId: "shopping-clone-c199a",
  storageBucket: "shopping-clone-c199a.appspot.com",
  messagingSenderId: "725095071865",
  appId: "1:725095071865:web:5a5929a805cb28519a94a8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
