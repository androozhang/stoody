// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,remove,update, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
console.log('nice')

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the Firebase authentication instance
const auth = firebase.auth();


// Function to update the password
function updatePass() {
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (newPassword !== confirmPassword) {
    // Display an error message if the new passwords don't match
    return alert('Passwords do not match');
  }

  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    oldPassword
  );

  // Reauthenticate the user with their current email and password
  firebase.auth().currentUser.reauthenticateWithCredential(credential)
    .then(() => {
      // Change the user's password
      firebase.auth().currentUser.updatePassword(newPassword)
        .then(() => {
          // Password updated successfully
          alert('Password updated successfully');
          // Redirect to homepage
          window.location.href = 'index.html';
        })
        .catch((error) => {
          // Handle password update error
          console.log(error);
        });
    })
    .catch((error) => {
      // Handle reauthentication error
      console.log(error);
      alert('Failed to reauthenticate user');
    });
}

// Make the updatePass function accessible from the window object
window.updatePass = updatePass;
