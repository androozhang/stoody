  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAp3TdTlrIVrC1tSTnb1RGRU3yqDH6m_kQ",
    authDomain: "stoody-4b216.firebaseapp.com",
    databaseURL: "https://stoody-4b216-default-rtdb.firebaseio.com",
    projectId: "stoody-4b216",
    storageBucket: "stoody-4b216.appspot.com",
    messagingSenderId: "529996409348",
    appId: "1:529996409348:web:ef17959ae2371612ec2351",
    measurementId: "G-NM62JEV9QW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const database = getDatabase(app);

var fullName = document.getElementById("fullname");
var contact = document.getElementById("contact");
var email = document.getElementById("email");
var password = document.getElementById("password");
var copassword = document.getElementById("copassword")
window.signup = function (e) {
if(password)

    if(fullName.value == "" || email.value =="" || password.value ==""){
        alert("All Field Are Required")
    }
    if(password.value == copassword.value){
     
    }
    else{
        alert("Password Confirmation is Wrong")
        return false
    }

    e.preventDefault();
    var obj = {
      firstName: fullName.value,
      email: email.value,
      password: password.value,
    };
  
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredential) => {
      const user = userCredential.user;
            // Declare user variable
            set(ref(database, 'users/' + user.uid), {
              email: obj.email,
              last_login: Date.now(),
              full_name: obj.firstName
          }).then(() => {
              // Success
              window.location.replace('login.html');
              alert('Signup successful');
          }).catch((error) => {
              // Error
              console.error(error);
              alert('Error: ' + error.message);
          });
    })
    .catch(function(err){
      alert("Error in " + err)
    });
   console.log()
    console.log(obj);
  };

  