// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,remove,update, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

var email = document.getElementById("email");
var password = document.getElementById("password");




window.login= function(e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      alert("logined Successfully")
      var aaaa =  (success.user.uid);
      localStorage.setItem("uid",aaaa)
      console.log(aaaa)
      
      
      
       window.location.replace('index.html')
     // localStorage.setItem(success,user,uid)
      
    })
    .catch(function (err) {
      alert("login error"+err);
    });

  console.log(obj);
}
