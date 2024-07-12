

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
    import { getFirestore,
      collection,
  addDoc,
  getDocs,
     } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
     import { getStorage
      , ref , uploadBytes,
      getDownloadURL 

      } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
    



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
  const db = getFirestore(app);
  const storage = getStorage(app);
  const profilecollection = collection(db,"profile")

  // console.log(app);

  // console.log(db);
//   console.log(app);
//   console.log(analytics);
//   console.log(auth);

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
      // applybox.style.display="none"
      useremail.innerText = user.email
      console.log("user is logged  inn");
    //   getallusers()

     

      // ...
    } else {
      authcontainer.style.display="block"
      usercontainer.style.display="none"
      // applybox.style.display="none"
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
    //   adddata(signupemail.value,signuppassword.value)


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




  const profile = document.getElementById("profile_img")
  const save = document.getElementById("save")
  const container =document.getElementById("container")
  const applybox =document.getElementsByClassName("apply-box")

  getimages()
  save.addEventListener("click", ()=> {
    
    console.log(profile.files[0]);
  const profileimagestorageRef = ref(storage ,"profile")
  save.disabled = true

    uploadBytes(profileimagestorageRef, profile.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(profileimagestorageRef)
  .then((url) => {
    console.log(url);


    addDoc(profilecollection,{ url ,category:"profile"})
    .then(()=>{
      console.log("document updated to DB");
      getimages()
  save.disabled = false

    })
    }).catch((err) =>console.log(err))
    .catch((err) =>console.log( "error in download=>" ,err));
  save.disabled = false

  })
});

 async function getimages() {
  const querySnapshot = await getDocs(profilecollection);
  container.innerHTML = ""
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(`${doc.id}, => );
  console.log(${doc.data()}`);

  const img =` <img src=${doc.data().url}  style="width: 150px;border-radius: 300px;"   id="image">PROFILE PICTURE`;

  container.innerHTML=img

});
}


const cv=document.getElementById("CV")
const button =document.getElementById("button")
// cv.addEventListener("click", function () {
//   applybox.style.display ="block"
//   }
// )

// if (authcontainer.style.display= "block") {
//   applybox.style.display= "none"
// } else if (usercontainer.style.display="block"){
//   applybox.style.display="none"
// }else{
//   applybox.style.display="block"
// }
