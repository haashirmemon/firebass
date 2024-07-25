import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Firebase configuration
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
const signup = document.getElementById('signup')
const signin = document.getElementById('signin')

const signupemail = document.getElementById("signupemail");
const signuppassword = document.getElementById("signuppassword");
const signupBtn = document.getElementById("signupBtn");

const signinemail = document.getElementById("signinemail");
const signinpassword = document.getElementById("signinpassword");
const signinBtn = document.getElementById("signinBtn");

const content = document.getElementById("content");
const authentication = document.getElementById("authentication");
const showEmail = document.getElementById("showEmail");

signupBtn.addEventListener("click", signupUser);
signinBtn.addEventListener("click", signinUser);

onAuthStateChanged(auth, (user) => {
  if (user) {
    content.style.display = "block";
    authentication.style.display = "none";
    showEmail.innerHTML = `<p>Welcome ${user.email}</p>`;
  } else {
    content.style.display = "none";
    authentication.style.display = "block";
  }
});

function signupUser() {
  const emailvalue = signupemail.value;
  const passwordvalue = signuppassword.value;
  
  createUserWithEmailAndPassword(auth, emailvalue, passwordvalue)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      addUserToFirestore(user);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}

function signinUser() {
  const emailvalue = signinemail.value;
  const passwordvalue = signinpassword.value;
  
  signInWithEmailAndPassword(auth, emailvalue, passwordvalue)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

function addUserToFirestore(user) {
  const usersCollection = collection(db, "users");
  addDoc(usersCollection, {
    uid: user.uid,
    email: user.email,
  })
  .then(() => {
    console.log("User added to Firestore");
  })
  .catch((error) => {
    console.error("Error adding user to Firestore:", error.message);
  });
}
const goToCreateAccount = document.getElementById("goToCreateAccount");
const goToSignIn = document.getElementById("goToSignIn");
goToCreateAccount.addEventListener("click", (e) => {
  e.preventDefault();
  signup.style.display = "block";
  signin.style.display = "none";
});
goToSignIn.addEventListener("click", (e) => {
  e.preventDefault();
  signup.style.display = "none";
  signin.style.display = "block";
});







  