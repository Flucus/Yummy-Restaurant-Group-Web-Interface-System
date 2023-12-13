// Event listener for DOMContentLoaded event to ensure the page is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Get references to form elements and buttons.
    const registerForm = document.getElementById("register-form");
    const submitButton = document.getElementById("register");
    const acceptRulesCheckbox = document.getElementById("acceptRules");

    // Object to store references to form input elements.
    const formElements = {
        name: document.getElementById("name"),
        nickname: document.getElementById("nickname"),
        password: document.getElementById("password"),
        rePassword: document.getElementById("re-password"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone")
    };

    // Function to display an alert message.
    function showAlert(message) {
        alert(message);
    }

    // Function to check if all required fields are filled.
    function areAllFieldsFilled() {
        return !Object.values(formElements).some(input => !input.value);
    }

    // Function to check if the password and re-password fields match.
    function isPasswordMatching() {
        return formElements.password.value === formElements.rePassword.value;
    }

    // Function to validate email using a regular expression pattern.
    function isValidEmail() {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(formElements.email.value);
    }

    // Function to validate phone number using a regular expression pattern.
    function isValidPhone() {
        const phonePattern = /^\d{8}$/;
        return phonePattern.test(formElements.phone.value);
    }

    // Function to check if the user has accepted the rules and conditions.
    function hasAcceptedRules() {
        return acceptRulesCheckbox.checked;
    }

    // Function to validate the entire registration form.
    function validateForm() {
        if (!areAllFieldsFilled()) {
            showAlert("Please fill in all the required fields.");
            return false;
        }

        if (!isPasswordMatching()) {
            showAlert("Password and re-password are not the same.");
            return false;
        }

        if (!isValidEmail()) {
            showAlert("Please enter a valid email address.");
            return false;
        }

        if (!isValidPhone()) {
            showAlert("Please enter a valid phone number.");
            return false;
        }

        if (!hasAcceptedRules()) {
            showAlert("Please accept the rules and conditions.");
            return false;
        }

        return true;
    }

    // Event listener for the form submission button.
    submitButton.addEventListener("click", e => {
        if (validateForm()) {
            showAlert("Registration successful!");
            window.location.href = "index.html"; // Redirect to the home page.
            e.preventDefault(); // Prevent the default form submission.
        }
    });
});
