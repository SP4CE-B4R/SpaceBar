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
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();

// Get user document from with the username
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

// Firestore timestamp NOT serializable to JSON. Must convert to milliseconds
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
  };
}