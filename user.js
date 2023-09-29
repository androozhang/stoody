// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);








window.logout = function () {
  signOut(auth)
    .then(function () {
      alert("Logout Successfully");
      window.location.href = "login.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      
      
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html";
    }
  });
}
checkAuthentication();

window.getUserTasks = function () {
  const tasksRef = ref(database, `users/${localStorage.getItem("uid")}/tasks`);
  onValue(tasksRef, (snapshot) => {
    const tasks = snapshot.val();
    const taskList = document.getElementById("myUL");
    if (taskList) {
      taskList.innerHTML = "";
      Object.keys(tasks).forEach((taskId) => {
        const task = tasks[taskId];
        const li = document.createElement("li");
        li.innerText = task;
        li.addEventListener("click", function() {
          this.classList.toggle("checked");
        });

        const closeBtn = document.createElement("span");
        closeBtn.innerHTML = "&#x00D7;";
        closeBtn.className = "close";
        closeBtn.addEventListener("click", function() {
          remove(ref(database, `users/${localStorage.getItem("uid")}/tasks/${taskId}`));
        });

        li.appendChild(closeBtn);
        taskList.appendChild(li);
      });
    }
  });
}





var myDiv2 = document.getElementById("mydiv2");
if (myDiv2 && myDiv2.style.display !== null) {
  myDiv2.style.display = "none";

window.toDoAppear = function() {
  var x = document.getElementById("mydiv2");
  var listBtn = document.querySelector(".fa-list");

  if (x.style.display === "none") {
    x.style.display = "block";
    listBtn.style.color = "#bae8e8";
    getUserTasks(); // Change color to #bae8e8 when mydiv2 is visible
  } else {
    x.style.display = "none";
    listBtn.style.color = "#333333"; // Change color back to #333333 when mydiv2 is hidden
  }
};

  var toDoButton = document.getElementById("toDoButton");
  if (toDoButton) {
    toDoButton.onclick = function() {
      window.toDoAppear();
    };
  } else {
    console.log("Element with ID 'toDoButton' not found.");
  }
} else {
  console.log("Element with ID 'mydiv2' not found or style.display is null.");
}

if (document.getElementById("mousedown") != null) {
  input.addEventListener('mousedown', (event) => {
    // stop the event from propagating to the parent elements
    event.stopPropagation();
  });
}


// get the input element
const input = document.getElementById('myInput');
        
// add an event listener for the mousedown event
if (document.getElementById("mousedown") != null) {
  input.addEventListener('mousedown', (event) => {
    // stop the event from propagating to the parent elements
    event.stopPropagation();
  });
}

  // Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
  
}

// Click on a close button to hide the current list item
// Add event listener to close buttons
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function() {
    var div = this.parentElement;
    div.style.display = "none";
    
  });
}
var close = document.getElementsByClassName("close");
var header = document.getElementById("mydivheader2");

for (var i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function() {
    header.style.height = (parseInt(header.style.height) - 50) + "px";
  });
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
if (list != null){
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
}
// Create a new list item when clicking on the "Add" button
window.newElement = function () {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);

  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);

    // Send the new li element to the database
    const obj = {
      task: inputValue,
      uid: localStorage.getItem("uid")
    };
    const keyRef = ref(database, `users/${obj.uid}/tasks`);
    push(keyRef, obj.task)
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);


  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

window.toggleDropdown = function () {
  var dropdown = document.querySelector(".dropdown-content");
  var musicDropdown = document.querySelector(".music-content");
  
  // Hide music dropdown if it's showing
  if (musicDropdown.classList.contains("show")) {
    musicDropdown.classList.remove("show");
  }
  
  dropdown.classList.toggle("show");
}

window.toggleMusicDropdown = function () {
  var dropdown = document.querySelector(".dropdown-content");
  var musicDropdown = document.querySelector(".music-content");
  
  // Hide main dropdown if it's showing
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  }
  
  musicDropdown.classList.toggle("show");
}
window.onload = function() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("user-info");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Check if btn and modal exist
  if (btn && modal) {
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block"; // Show the modal
    };

    // When the user clicks on the <span> element, close the modal
    span.onclick = function() {
      modal.style.display = "none"; // Hide the modal
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none"; // Hide the modal
      }
    };
  } else {
    console.error("Button or modal element not found.");
  }
};


// Create popupContent element
var popupContent = document.createElement("div");

// Create popupContainer element
var popupContainer = document.createElement("div");
popupContainer.id = "popupContainer";
popupContainer.classList.add("hide"); // Assuming you have a CSS class named "hide" to hide the container initially

// Create closePopupButton element
var closePopupButton = document.createElement("button");
closePopupButton.className = "close";
closePopupButton.textContent = "Close";

// Append elements to the document
popupContent.appendChild(closePopupButton);
popupContainer.appendChild(popupContent);
document.body.appendChild(popupContainer);


  //FLASHCARDS
  const container = document.querySelector(".container");
  const addQuestionCard = document.getElementById("add-question-card");
  const cardButton = document.getElementById("save-btn");
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const errorMessage = document.getElementById("error");
  const addQuestion = document.getElementById("add-flashcard");
  const closeBtn = document.getElementById("close-btn");
  var userId = localStorage.getItem("uid");
  let editBool = false;
  let currentFlashcardKey = null;

// Add question when user clicks 'Add Flashcard' button


if (addQuestion) {
  addQuestion.addEventListener("click", () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
  });
} else {
  console.log("Element with ID 'add-flashcard' not found.");
}


// Hide Create flashcard Card
let hideQuestion;
if (closeBtn ){
closeBtn.addEventListener("click", hideQuestion = () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (editBool) {
    editBool = false;
  }
});
}
else {
  console.log("Element with ID 'close-btn' not found.");
}
// Submit Question
let submitQuestion;
let tempAnswer;
let tempQuestion;
if(cardButton){
cardButton.addEventListener("click", (submitQuestion = () => {
  editBool = false;
  tempQuestion = question.value.trim();
  tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    container.classList.remove("hide");
    errorMessage.classList.add("hide");

    // Write the flashcard question and answer to the database
    if (userId) {
      const flashcardRef = ref(database, `users/${userId}/flashcards`);
      if (editBool && currentFlashcardKey) {
        // Update existing flashcard
        const flashcardToUpdate = child(flashcardRef, currentFlashcardKey);
        update(flashcardToUpdate, {
          question: tempQuestion,
          answer: tempAnswer,
        });

        // Update the question and answer in the existing flashcard element
        updateFlashcardElement(currentFlashcardKey, tempQuestion, tempAnswer);

        // Reset current flashcard key
        currentFlashcardKey = null;
      } else {
        // Create new flashcard
        const newFlashcardRef = push(flashcardRef);
        set(newFlashcardRef, {
          question: tempQuestion,
          answer: tempAnswer,
        });

        // Create a new flashcard element
        const flashcardKey = newFlashcardRef.key;
        createFlashcardElement(flashcardKey, tempQuestion, tempAnswer);
      }
    }

    // Hide the add question card
    hideQuestion();

    question.value = "";
    answer.value = "";
  }
}));
}
else {
  console.log("Element with ID 'save-btn' not found.");
}

// Update an existing flashcard element with new question and answer
function updateFlashcardElement(flashcardKey, questionText, answerText) {
  const flashcardElement = document.querySelector(`div[data-key="${flashcardKey}"]`);
  if (flashcardElement) {
    const questionDiv = flashcardElement.querySelector(".question-div");
    const answerDiv = flashcardElement.querySelector(".answer-div");
    questionDiv.textContent = questionText;
    answerDiv.textContent = answerText;
  }
}

// Remove flashcard from Firebase and UI
function removeFlashcard(flashcardKey) {
  if (userId) {
    const flashcardRef = ref(database, `users/${userId}/flashcards/${flashcardKey}`);
    remove(flashcardRef)
      .then(() => {
        console.log("Flashcard removed successfully");
        const flashcardElement = document.querySelector(`div[data-key="${flashcardKey}"]`);
        flashcardElement.remove();
      })
      .catch((error) => {
        console.error("Error removing flashcard: ", error);
      });
  }
}


// Function to load Firebase data into flashcards
function loadFlashcards() {
  if (userId) {
    const flashcardsRef = ref(database, `users/${userId}/flashcards`);
    get(flashcardsRef).then((snapshot) => {
      const flashcardsData = snapshot.val();
      for (const flashcardKey in flashcardsData) {
        const flashcardData = flashcardsData[flashcardKey];
          createFlashcardElement(flashcardKey, flashcardData.question, flashcardData.answer);
        }
    });
  }
}



function createFlashcardElement(flashcardKey, questionText, answerText) {
  // Check if the flashcard element already exists
  const existingFlashcard = document.querySelector(`div[data-key="${flashcardKey}"]`);
  if (existingFlashcard) {
    // Update the existing flashcard element
    const questionDiv = existingFlashcard.querySelector(".question-div");
    const answerDiv = existingFlashcard.querySelector(".answer-div");
    questionDiv.textContent = questionText;
    answerDiv.textContent = answerText;
  } else {
    // Create a new flashcard element
    var listCard = document.getElementsByClassName("card-list-container")[0];
    var div = document.createElement("div");
    div.classList.add("card");
  
    // Question
    var questionDiv = document.createElement("p");
    questionDiv.classList.add("question-div");
    questionDiv.textContent = questionText;
  
    // Answer
    var displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div", "hide");
    displayAnswer.textContent = answerText;
  
    // Link to show/hide answer
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.textContent = "Show/Hide";
    link.addEventListener("click", () => {
      displayAnswer.classList.toggle("hide");
    });
  
    div.appendChild(questionDiv);
    div.appendChild(link);
    div.appendChild(displayAnswer);
  
  // Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
editButton.addEventListener("click", () => {
// Set the current question and answer values
const questionValue = questionText;
const answerValue = answerText;

// Set the current values in the input fields
question.value = questionValue;
answer.value = answerValue;

// Save the current flashcard key
currentFlashcardKey = flashcardKey;

// Set editBool to true only if it's currently false
editBool = !editBool;

modifyElement(editButton, true);
addQuestionCard.classList.remove("hide");
disableButtons(true);
});

  
  buttonsCon.appendChild(editButton);
  disableButtons(false);
    // Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener("click", () => {
      removeFlashcard(flashcardKey);
      modifyElement(deleteButton);
    });
    buttonsCon.appendChild(deleteButton);
  
    div.appendChild(buttonsCon);
    div.setAttribute("data-key", flashcardKey);
    listCard.appendChild(div);
  }
}


// Call the function to load Firebase data into flashcards
loadFlashcards();

// Modify Elements
const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;
  const flashcardKey = parentDiv.getAttribute("data-key");
  const parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    const parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
    currentFlashcardKey = flashcardKey;
  }
  parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};//Home Index
window.goToIndex = function() {
  window.location.href = "index.html";
}

// Add the JS for the "How it Works" button
const howItWorksButton = document.getElementById("flashcard-info");
popupContainer = document.createElement("div");
popupContainer.setAttribute("class", "popup-container hide");
popupContent = document.createElement("div");
popupContent.setAttribute("class", "popup-content");
closePopupButton = document.createElement("i");
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
if(howItWorksButton){
howItWorksButton.addEventListener("click", () => {
  // Show the pop-up div with instructions
  popupContainer.classList.remove("hide");
});
}
else {
  console.log("Element with ID 'flashcard-info' not found.");
}

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

//UserInfo
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

if (userInfoButton){
// Event listener for the user-info button
userInfoButton.addEventListener("click", () => {
  // Show the user information pop-up
  userInfoPopupContainer.classList.remove("hide");
});
}
else{
  
}

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
window.updatePass = function() {
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (newPassword !== confirmPassword) {
      // Display an error message if the new passwords don't match
      return alert('Passwords do not match');
  }

  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
  );

  // Reauthenticate the user with their current password
  user.reauthenticateWithCredential(credentials)
      .then(() => {
          // Change the user's password
          user.updatePassword(newPassword)
              .then(() => {
                  // Password updated successfully
                  alert('Password updated successfully');
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