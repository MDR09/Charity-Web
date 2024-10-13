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

// home.js

document.getElementById("loginBtn").onclick = function() {
    document.getElementById("loginSignupModal").style.display = "block";
};

document.querySelector(".close").onclick = function() {
    document.getElementById("loginSignupModal").style.display = "none";
};

// Switch between login and signup forms
document.getElementById("signupLink").onclick = function(e) {
    e.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
};

document.getElementById("loginLink").onclick = function(e) {
    e.preventDefault();
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
};

// Handle login
document.getElementById("submitLogin").onclick = function() {
    // Here you would usually validate the credentials, this is just a simulation
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {
        // Simulate a successful login
        document.getElementById("loginSignupModal").style.display = "none";
        document.getElementById("navLoginSignup").style.display = "none"; // Hide login/signup button
        document.getElementById("navMyDonation").style.display = "block"; // Show My Donations link
        document.getElementById("navLogout").style.display = "block"; // Show Logout button
    } else {
        alert("Please enter your email and password.");
    }
};

// Handle logout
document.getElementById("logoutBtn").onclick = function() {
    document.getElementById("navLoginSignup").style.display = "block"; // Show login/signup button
    document.getElementById("navMyDonation").style.display = "none"; // Hide My Donations link
    document.getElementById("navLogout").style.display = "none"; // Hide Logout button
};


// Handle Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});
