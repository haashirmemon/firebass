
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { 
    getAuth
    ,onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
    import { 
      getFirestore,
  collection,
  addDoc,
  getDocs,
     }from
     "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD9GDtcJxLP2TTjYoTMTZewiPfeAaBOv_8",
    authDomain: "st-project-25a1c.firebaseapp.com",
    projectId: "st-project-25a1c",
    storageBucket: "st-project-25a1c.appspot.com",
    messagingSenderId: "980243412065",
    appId: "1:980243412065:web:5fdaeda4583a3b6a0be620",
    measurementId: "G-BQY9RECC58"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  // console.log(app);
  // console.log(analytics);
  // console.log(auth);

  const signupemail = document.getElementById("signupemail")
  const signuppassword = document.getElementById("signuppassword")
  const signupbtn = document.getElementById("signupbtn")

  
  const signinemail = document.getElementById("signinemail")
  const signinpassword = document.getElementById("signinpassword")
  const signinbtn = document.getElementById("signinbtn")
  const useremail = document.getElementById("useremail")
  const logoutbtn = document.getElementById("btnlogout")
  // const showEmail = document.getElementById("showEmail");a
const allusersdiv = document.getElementById("allusers");

  
  const authcontainer = document.getElementById("authcontainer")
  const usercontainer = document.getElementById("usercontainer")

  signupbtn.addEventListener("click",createuseraccount)
  signinbtn.addEventListener("click",signin)
  logoutbtn.addEventListener("click",logout)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      authcontainer.style.display="none"
      usercontainer.style.display="block"
      useremail.innerText = user.email
      console.log("user is logged  inn");
      getallusers()

     

      // ...
    } else {
      authcontainer.style.display="block"
      usercontainer.style.display="none"
      console.log("user is  not logged  inn");
      // User is signed out
      // ...
     

    }
  });
  function createuseraccount() {
    
    createUserWithEmailAndPassword(auth, signupemail.value, signuppassword.value)
    

    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      adddata(signupemail.value,signuppassword.value)


      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)

      // ..
    });
  }
  function signin(){
    // console.log(signinemail.value);
    // console.log(signinpassword.value);
    signInWithEmailAndPassword(auth, signinemail, signinpassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  }
  function logout(){
  

    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const db = getFirestore(app)
  console.log(db);

  const myobj ={
    name:'haashir',
    age:18,
    country:'pakistan',
    hobbies:['coding'],
    teacher:{name:'Sir bilal'}
  }

 
   async function adddata(email,password) {
  try {
    const userref = await addDoc(collection(db, "users"), {
      email:email,
      password:password,
      created_at:new Date().toISOString()
    });
  
    console.log("Document written with ID: ", userref.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
 };
//  adddata()
  
 async function getallusers(){
  const usercollection = collection(db,"allusers")
  const querySnapshot = await getDocs(collection(db, "users"));
  allusersdiv.innerText+=""
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().email}`);
  var addusers = `<div id=${doc.id}>
  <p>${doc.data().email}</p>
  <p>${doc.data().password}</p>
  </div>`;
  allusersdiv.innerHTML+=addusers
});
 }
// console.log('bhai ye wal amene kara hai q k me sdendkv',getallusers);

// let tododiv = document.getElementById("div1")

// var maindiv = document.getElementsByClassName("")
// var maindiv = document.getElementsByClassName("container")
var button = document.getElementById("addbtn")
var historydiv = document.getElementById("historydiv")
var input = document.getElementById("todo")
let parent = document.getElementById("parent")
let div1 = document.getElementById("div1")
var card = document.getElementById("card")
var description =document.getElementById("description")
var category = document.getElementById("category")

button.addEventListener("click",function () {
    if (input.value.trim() === "") {
        return alert("please add todo")
    }
var now = new Date()
var time = now.toLocaleTimeString()
// var li = `<li>${input.value.trim()} ${time} <button  id="delete" onclick="console.log("this.parentnode.remove())">delete</button></li>`




 var li = `  <li id="li">
 <div id="div1">
 <div id="card" style="width: 18rem;">

  <img src="download (1).jpeg" class="card-img-top" alt="..." id="image">
  <div class="card-body"> CATEGORY   ${category.value}
    <h5 class="card-title"> TODO VALUE ${todo.value.trim()} </h5>
    <p class="card-text">DESCRIPTION   ${description.value}</p>
    <a href="#" class="btn btn-primary">${time} </a>
  </div>
 </div>
</div>
 
 
 </li>
 
  ` 
         


historydiv.innerHTML += li

// historydiv.innerHTML += li 

todo.value = ''

})

// <button  id="delete"  onclick = "console.log(li.remove())">Del </button>