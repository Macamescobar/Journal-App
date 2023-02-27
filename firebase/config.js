// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAViJHzgE5nGHA9zUd9HHMAjzGd4hth3hY",
  authDomain: "react-cursos-c7111.firebaseapp.com",
  projectId: "react-cursos-c7111",
  storageBucket: "react-cursos-c7111.appspot.com",
  messagingSenderId: "929101863197",
  appId: "1:929101863197:web:0c17bc62dd7f4888eda9f4"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth =  getAuth( FirebaseApp);
export const FirebaseDB = getFirestore( FirebaseApp);