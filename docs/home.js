 // Import Firebase functions
 // Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
    
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGMUO9YFJnO-F6QhtqJyisDZleHQvgygY",
    authDomain: "charity-78b81.firebaseapp.com",
    projectId: "charity-78b81",
    storageBucket: "charity-78b81.appspot.com",
    messagingSenderId: "351871288311",
    appId: "1:351871288311:web:057d6d5a4575d67ba524f2",
    measurementId: "G-2TM815MBN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference to Firebase Database
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Existing modal-related code...
var modal = document.getElementById('loginSignupModal');
var loginBtn = document.getElementById('loginBtn');
var closeBtn = document.getElementsByClassName('close')[0];
var signupLink = document.getElementById('signupLink');
var loginLink = document.getElementById('loginLink');
var loginForm = document.getElementById('loginForm');
var signupForm = document.getElementById('signupForm');

// Function to open the modal
function openModal() {
    modal.style.display = 'flex';
}

// Open modal when login button is clicked
loginBtn.onclick = openModal;

// Close modal when clicking on 'X' button
closeBtn.onclick = function() {
    modal.style.display = 'none';
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

// Close modal if clicked outside the content area
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Function to switch forms
function switchForm(hideForm, showForm) {
    hideForm.style.display = 'none';
    showForm.style.display = 'block';
}

// Show signup form when clicking 'Sign up here'
signupLink.onclick = function(event) {
    event.preventDefault();
    switchForm(loginForm, signupForm);
}

// Show login form when clicking 'Login here'
loginLink.onclick = function(event) {
    event.preventDefault();
    switchForm(signupForm, loginForm);
}

// Add event listener for Sign Up button

document.getElementById('submitSignup').addEventListener('click', function(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (name === "" || email === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    alert('A verification email has been sent to your email address. Please verify your email to complete the sign-up.');
                    document.getElementById('signupName').value = '';
                    document.getElementById('signupEmail').value = '';
                    document.getElementById('signupPassword').value = ''; // Reset form

                    return set(ref(db, 'users/' + user.uid), {
                        username: name,
                        email: email
                    });
                })
                .catch((error) => {
                    alert('Error while sending verification email: ' + error.message);
                });
        })
        .catch((error) => {
            alert('Sign up failed: ' + error.message);
            document.getElementById('signupName').value = '';
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';

        });
});

// Handle Login
document.getElementById('submitLogin').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Check if email is verified
            if (!user.emailVerified) {
                alert("Please verify your email before logging in.");
                return;
            }

            alert("Login successful!");
            modal.style.display = 'none'; // Close modal
            document.getElementById("navLoginSignup").style.display = "none"; // Hide login/signup button
            document.getElementById("navMyDonation").style.display = "block"; // Show My Donations link
            document.getElementById("navLogout").style.display = "block"; // Show Logout button

        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});


// Handle logout
document.getElementById("logoutBtn").onclick = function() {
    document.getElementById("navLoginSignup").style.display = "block"; // Show login/signup button
    document.getElementById("navMyDonation").style.display = "none"; // Hide My Donations link
    document.getElementById("navLogout").style.display = "none"; // Hide Logout button
};

// Existing hamburger menu toggle and donation page redirection code...


// Handle Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Wait for the DOM to load before applying event listener
document.addEventListener("DOMContentLoaded", function() {
    var startButton = document.getElementById("startWithLittleBtn");

    if (startButton) {
        startButton.addEventListener("click", function() {
            // Redirect to the donation page
            window.location.href = "donate.html";
        });
    }

    var donateButtons = document.querySelectorAll(".donateNowBtn");
    console.log("Donate buttons found: ", donateButtons.length);

    donateButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            console.log("Donate Now button clicked!");
            window.location.href = "donate.html";
        });
    });
});






// // Handle Signup
// document.getElementById('submitSignup').onclick = function() {
//     const name = document.getElementById('Name').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;

//     // Validate input
//     if (!name || !email || !password) {
//         alert("Please fill out all fields.");
//         return;
//     }

//     // Create user with Firebase Authentication
//     auth.createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;

//             // Save user info in the Realtime Database
//             return database.ref('users/' + user.uid).set({
//                 name: name,
//                 email: email,
//             });
//         })
//         .then(() => {
//             alert("Signup successful!");
//             signupForm.reset(); // Reset the signup form
//             switchForm(signupForm, loginForm); // Switch to login form
//             openModal(); // Open the modal
//         })
//         .catch((error) => {
//             console.error("Error during signup: ", error.code, error.message);
//             alert("Error: " + error.message);
//         });
// };

// // Handle Login
// document.getElementById("submitLogin").onclick = function() {
//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;

//     if (!email || !password) {
//         alert("Please enter your email and password.");
//         return;
//     }

//     auth.signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             alert("Login successful!");
// modal.style.display = 'none'; // Close modal
// document.getElementById("navLoginSignup").style.display = "none"; // Hide login/signup button
// document.getElementById("navMyDonation").style.display = "block"; // Show My Donations link
// document.getElementById("navLogout").style.display = "block"; // Show Logout button
// //         })
//         .catch((error) => {
//             console.error("Error during login: ", error.code, error.message);
//             alert("Error: " + error.message);
//         });
