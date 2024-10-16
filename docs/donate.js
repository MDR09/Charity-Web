// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, get, set, child } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

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

// Check login state on page load
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; 

// Get references to the login/signup modal and buttons
const loginSignupModal = document.getElementById("loginSignupModal");
const submitDonate = document.getElementById("submitDonate");
const loginButton = document.getElementById("loginButton");

// Handle login button click
loginButton.addEventListener("click", function() {
    if (isLoggedIn) {
        // If already logged in, log out
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false"); // Update local storage
        loginButton.textContent = "Login"; // Change text back to 'Login'
        loginButton.classList.remove("active"); // Remove active class
        alert("You have been logged out.");

        // Clear login input fields
        document.getElementById('loginEmail').value = ''; // Clear email
        document.getElementById('loginPassword').value = ''; // Clear password
    } else {
        // Show login/signup modal if not logged in
        loginSignupModal.style.display = 'block';
    }
});

// Function to check login status before allowing donation
submitDonate.addEventListener("click", function() {
    if (isLoggedIn) {
        // Proceed to the donation form if the user is logged in
        document.getElementById('formContainer').style.display = 'block';
    } else {
        // Show login/signup modal if not logged in
        loginSignupModal.style.display = 'block';
    }
});

// Handle Login
document.getElementById('submitLogin').addEventListener('click', function(e) {
    e.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Reference the database
    const dbRef = ref(db);

    // Check if user exists
    get(child(dbRef, `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
            let userExists = false;

            // Loop through all the users in the database
            snapshot.forEach(function(childSnapshot) {
                const user = childSnapshot.val();
                // Check if email and password match
                if (user.email === loginEmail && user.password === loginPassword) {
                    userExists = true;
                    alert("Login successful!");

                    // Save login state and user information to localStorage
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user details if needed
                    
                    // Change the login button to a logout button and activate it
                    isLoggedIn = true; // Update login status
                    loginButton.textContent = "Logout"; // Change button text to 'Logout'
                    loginButton.classList.add("active"); // Add active class
                    loginSignupModal.style.display = 'none'; // Close the modal
                }
            });

            if (!userExists) {
                alert("Invalid email or password. Please try again or sign up first.");
            }
        } else {
            alert("No users found. Please sign up first.");
        }
    }).catch((error) => {
        alert("Error checking database: " + error.message);
    });
});

// On page load, check if user is already logged in
window.onload = function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginButton = document.getElementById("loginButton");

    if (isLoggedIn) {
        // Update the UI to reflect the login state
        loginButton.textContent = "Logout";
        loginButton.classList.add("active");

        // You can also use the logged-in user details from localStorage if needed
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        console.log("Logged in as:", loggedInUser.email); // Example usage
    } else {
        loginButton.textContent = "Login";
        loginButton.classList.remove("active");
    }
};

// Handle login button click (toggles between login and logout)
loginButton.addEventListener("click", function() {
    if (isLoggedIn) {
        // Log out the user
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false"); // Update localStorage
        localStorage.removeItem("loggedInUser"); // Remove user details from localStorage
        loginButton.textContent = "Login"; // Update button text
        loginButton.classList.remove("active"); // Remove active class
        alert("You have been logged out.");
    } else {
        // Show login modal if not logged in
        loginSignupModal.style.display = 'block';
    }
});


// Add event listener for Sign Up button
document.getElementById('submitSignup').addEventListener('click', function(e) {
    e.preventDefault();

    // Get the values from the signup form
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Validate if fields are not empty
    if (name === "" || email === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    const userRef = ref(db, 'users/' + name);

    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            alert("This username is already taken. Please choose a different one.");
        } else {
            // Store the signup details in Firebase Realtime Database
            set(userRef, {
                username: name,
                email: email,
                password: password
            }).then(() => {
                alert('Sign up successful!');
                loginSignupModal.style.display = 'none'; // Close the modal after signup
            }).catch((error) => {
                alert('Error: ' + error.message);
            });
        }
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
});

// Logic to handle modal close
const closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function() {
    loginSignupModal.style.display = "none";
};

// Add the same form toggle logic for signup and login switch
document.getElementById("signupLink").addEventListener("click", function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
});

document.getElementById("loginLink").addEventListener("click", function() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

// Update UI on page load based on login state
if (isLoggedIn) {
    loginButton.textContent = "Logout"; // Change to 'Logout' if logged in
    loginButton.classList.add("active"); // Add active class
}

// Function to handle donation amount submission
document.getElementById("submitDonate").addEventListener("click", function() {
    const customAmountInput = document.getElementById("customAmount");
    const errorMessage = document.getElementById("errorMessage");
    const amountSelected = document.querySelector('input[name="amount"]:checked');
    
    // Reset error message
    errorMessage.textContent = '';
    
    // Get the custom amount or selected radio button value
    const customAmount = parseFloat(customAmountInput.value);
    const selectedAmount = amountSelected ? parseFloat(amountSelected.value) : 0;
    const donationAmount = customAmount || selectedAmount;

    // Validate the donation amount
    if (isNaN(donationAmount) || donationAmount <= 0) {
        errorMessage.textContent = "Please enter a valid donation amount.";
        customAmountInput.focus();
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("donationOptions").style.display = "block"; 
        return; // Prevent further action
    }

    if (donationAmount < 500) {
        errorMessage.textContent = "The minimum donation amount is ₹500.";
        customAmountInput.focus();

        // Hide form container and ensure donation options are still visible
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("donationOptions").style.display = "block"; 
        return; // Prevent further action
    }

    // If amount is valid and meets the minimum, proceed with showing the form
    document.getElementById('donationOptions').style.display = 'none';
    document.getElementById("formContainer").style.display = "block";
});
// db.ref('donations').push(donationData)  // Change from 'database' to 'db'
//     .then(() => {
//         alert('Donation data saved successfully!');
//         // Optionally, you can redirect to a different page or reset the form here
//     })
//     .catch((error) => {
//         console.error('Error saving donation data:', error);
//     });

// Updated form submission code
document.getElementById('formContainer').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = {
        name: document.querySelector('input[type="text"]').value,
        email: document.querySelector('input[type="email"]').value,
        phone: document.querySelector('input[type="tel"]').value,
        dob: document.getElementById('dob').value,
        city: document.querySelector('input[placeholder="City"]').value,
        pinCode: document.querySelector('input[placeholder="Pin Code"]').value,
        address: document.querySelector('input[placeholder="Address"]').value,
        date: new Date().toISOString()
    };

    // Validate form fields
    if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Save form data to Firebase
    set(ref(db, 'formSubmissions'), formData)
        .then(() => {
            alert('Form data saved successfully!');

            // Now proceed to save donation data after form submission is successful
            saveDonationData();
            this.reset(); // Reset the form
        })
        .catch((error) => {
            console.error('Error saving form data:', error);
            alert('There was an error submitting the form. Please try again.');
        });
});

// Function to save donation data only after successful form submission
function saveDonationData() {
    const selectedAmount = document.querySelector('input[name="amount"]:checked');
    const customAmount = document.getElementById('customAmount').value;
    const amount = selectedAmount ? selectedAmount.value : customAmount;

    if (!amount) {
        document.getElementById('errorMessage').innerText = "Please select or enter an amount.";
        return;
    }

    const donationData = {
        amount: amount,
        date: new Date().toISOString()
    };

    // Save donation data to Firebase
    set(ref(db, 'donations'), donationData)
        .then(() => {
            alert('Donation data saved successfully!');
            // Optionally, you can redirect to a different page or reset the donation form here
        })
        .catch((error) => {
            console.error('Error saving donation data:', error);
            alert('There was an error saving the donation. Please try again.');
        });
}



