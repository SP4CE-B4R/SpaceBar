import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBUTgg3GFNgJA019-YDWeAZwP8AYttm4bI",
  authDomain: "spacebar-2520.firebaseapp.com",
  projectId: "spacebar-2520",
  storageBucket: "spacebar-2520.appspot.com",
  messagingSenderId: "118223831479",
  appId: "1:118223831479:web:95faeb4d809e74cf236832",
  measurementId: "G-WQXGYEQFJJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();

// Storage exports
export const storage = firebase.storage();