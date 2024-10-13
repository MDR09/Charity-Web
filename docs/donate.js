// donate.js
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login state on page load

// Get references to the login/signup modal and buttons
const loginSignupModal = document.getElementById("loginSignupModal");
const submitDonate = document.getElementById("submitDonate");

// Handle login button click
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function() {
    if (isLoggedIn) {
        // If already logged in, log out
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false"); // Update local storage
        loginButton.textContent = "Login"; // Change text back to 'Login'
        loginButton.classList.remove("active"); // Remove active class
        alert("You have been logged out."); // Optional: Show a message
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

// Logic to handle login/signup process
document.getElementById("submitLogin").addEventListener("click", function() {
    // Mock login logic
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true"); // Store login state in local storage
    loginSignupModal.style.display = 'none'; // Close modal after login
    alert("You are now logged in. You can donate now.");

    // Change the login button to a logout button and activate it
    loginButton.textContent = "Logout"; // Change text to 'Logout'
    loginButton.classList.add("active"); // Add active class
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
        errorMessage.textContent = "Please enter a donation amount.";
        customAmountInput.focus();
        return; // Prevent further action
    }

    if (donationAmount < 500) {
        errorMessage.textContent = "The minimum donation amount is ₹500.";
        customAmountInput.focus();
        return; // Prevent further action
    }

    if (donationAmount == 500){
        document.getElementById('donationOptions').style.display = 'none';
        document.getElementById("formContainer").style.display = "block";
    }
    // If amount is valid, show the form container
    document.getElementById('donationOptions').style.display = 'none';
    document.getElementById("formContainer").style.display = "block";
});

function showForm() {
    document.getElementById('donationOptions').style.display = 'none'; // Hide the donation options
    document.getElementById('formContainer').style.display = 'block'; // Show the new form container
}

function goBack() {
    document.getElementById('donationOptions').style.display = 'block'; // Show the donation options
    document.getElementById('formContainer').style.display = 'none'; // Hide the new form container
}






