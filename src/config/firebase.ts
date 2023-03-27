// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvrOix03gJCFwldfV3UpqNnrwRXhtYGO8",
  authDomain: "philcoin.firebaseapp.com",
  projectId: "philcoin",
  storageBucket: "philcoin.appspot.com",
  messagingSenderId: "39694570042",
  appId: "1:39694570042:web:2b5f703c7fc0bb3d5a1b03",
  measurementId: "G-2BJ39FSFN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
