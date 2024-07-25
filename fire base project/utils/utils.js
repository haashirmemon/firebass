import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_DSVWDFp1GjUf02WCcgfeRY6b4sOVItg",
  authDomain: "fire-base-project-11d07.firebaseapp.com",
  projectId: "fire-base-project-11d07",
  storageBucket: "fire-base-project-11d07.appspot.com",
  messagingSenderId: "669246444842",
  appId: "1:669246444842:web:3581a080e0aba5cf98ba53"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
console.log(app ,auth, db ,storage);

export {
  auth,
  db,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  ref,
  uploadBytes,
  getDownloadURL,
};