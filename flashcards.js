// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);


const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
var userId = localStorage.getItem("userId");
let editBool = false;

//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

//Hide Create flashcard Card
closeBtn.addEventListener(
  "click",
  (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

// Get the user's ID from local storage
var userId = localStorage.getItem("userId");


// Submit Question
cardButton.addEventListener(
  "click",
  (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      container.classList.remove("hide");
      errorMessage.classList.add("hide");
      viewlist();
      question.value = "";
      answer.value = "";
      // Write the flashcard to the Firebase database
      var flashcardRef = database.ref("users/" + userId + "/flashcards").push();
      flashcardRef.set({
        question: tempQuestion,
        answer: tempAnswer
      });
    }
  })
);
//Card Generate
function viewlist() {
  var listCard = document.getElementsByClassName("card-list-container");
  var div = document.createElement("div");
  div.classList.add("card");
  //Question
  div.innerHTML += `
  <p class="question-div">${question.value}</p>`;
  //Answer
  var displayAnswer = document.createElement("p");
  displayAnswer.classList.add("answer-div", "hide");
  displayAnswer.innerText = answer.value;

  //Link to show/hide answer
  var link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = "Show/Hide";
  link.addEventListener("click", () => {
    displayAnswer.classList.toggle("hide");
  });

  div.appendChild(link);
  div.appendChild(displayAnswer);

  //Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  //Delete Button
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard[0].appendChild(div);
  hideQuestion();
}

//Modify Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    let parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};
//Home Index
function goToIndex() {
  window.location.href = "index.html";
}
// Add the JS for the "How it Works" button
const howItWorksButton = document.getElementById("flashcard-info");
const popupContainer = document.createElement("div");
popupContainer.setAttribute("class", "popup-container hide");
const popupContent = document.createElement("div");
popupContent.setAttribute("class", "popup-content");
const closePopupButton = document.createElement("i");
closePopupButton.setAttribute("class", "fas fa-times close-popup");

// Instructions content
popupContent.innerHTML = `
  <h3>Flashcard Function Instructions</h3>
  <ol>
    <li>Hover over and click the <strong>"Create Flashcards"</strong> button located in the center of the top navigation bar. This button allows you to generate new flashcards.</li>
    <li>Once clicked, you'll be directed to a page where you can fill in the answer to a question of your choice. Enter your answer in the provided input field.</li>
    <li>When you're ready, click the <strong>"Create Flashcard"</strong> button located at the bottom of the input. A flashcard will be instantly generated based on your input.</li>
    <li>To reveal or hide the answer to the question on the flashcard, simply click the <strong>"Show/Hide"</strong> button. You can also take further actions by clicking the buttons located below the "Show/Hide" option. Use the <strong>"Edit Flashcard"</strong> button to modify the content of the flashcard or the <strong>"Delete Flashcard"</strong> button to remove it from your collection.</li>
    <li>To add more flashcards, click the <strong>"Add Flashcard"</strong> button. If you want to return to Stoody's main page, click the <strong>"Home"</strong> button. If you need assistance or want to learn more about how to use Stoody's flashcard feature, click the <strong>"How it Works"</strong> button.</li>
  </ol>
`;

// Append elements to the document
popupContent.appendChild(closePopupButton);
popupContainer.appendChild(popupContent);
document.body.appendChild(popupContainer);

// Event listener for the "How it Works" button
howItWorksButton.addEventListener("click", () => {
  // Show the pop-up div with instructions
  popupContainer.classList.remove("hide");
});

// Event listener for closing the pop-up
closePopupButton.addEventListener("click", () => {
  // Hide the pop-up div
  popupContainer.classList.add("hide");
});

// Event listener to hide the pop-up when clicking outside the content
popupContainer.addEventListener("click", (event) => {
  if (event.target === popupContainer) {
    popupContainer.classList.add("hide");
  }
});


const userInfoButton = document.getElementById("user-info");
const userInfoPopupContainer = document.createElement("div");
userInfoPopupContainer.setAttribute("class", "popup-container hide");
const userInfoPopupContent = document.createElement("div");
userInfoPopupContent.setAttribute("class", "popup-content");
const closeUserInfoPopupButton = document.createElement("i");
closeUserInfoPopupButton.setAttribute("class", "fas fa-times close-popup");

// Retrieve user information from Firebase
const usersRef = ref(database, `users/${localStorage.getItem("uid")}`);
get(usersRef).then((snapshot) => {
  const userData = snapshot.val();
  // User information content
  userInfoPopupContent.innerHTML = `
    <h2>User Information</h2>
    <p>Name: ${userData.full_name}</p>
    <p>Email: ${userData.email}</p>
    <div id="password-box">
      <button onclick="changePassword()" id="change-password">Change Password</button>
      <button onclick="window.location.href = 'password.html'" id="change-password">Change Password</button>
    </div>
    <div id="logout">
      <button onclick="logout()" id="logoutBtn">Logout</button>
    </div>
  `;
});

// Append elements to the document
userInfoPopupContent.appendChild(closeUserInfoPopupButton);
userInfoPopupContainer.appendChild(userInfoPopupContent);
document.body.appendChild(userInfoPopupContainer);

// Event listener for the user-info button
userInfoButton.addEventListener("click", () => {
  // Show the user information pop-up
  userInfoPopupContainer.classList.remove("hide");
});

// Event listener for closing the user information pop-up
closeUserInfoPopupButton.addEventListener("click", () => {
  // Hide the user information pop-up
  userInfoPopupContainer.classList.add("hide");
});

// Event listener to hide the user information pop-up when clicking outside the content
userInfoPopupContainer.addEventListener("click", (event) => {
  if (event.target === userInfoPopupContainer) {
    userInfoPopupContainer.classList.add("hide");
  }
});
