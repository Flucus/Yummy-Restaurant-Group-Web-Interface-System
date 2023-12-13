// Event listener for DOMContentLoaded event to ensure the page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    // Get the login button element.
    const loginButton = document.getElementById("login-btn");

    // Check if the login button exists on the page.
    if (loginButton) {
        // Add a click event listener to the login button.
        loginButton.addEventListener("click", handleLoginClick);
    }
});

// Function to handle the click event on the login button.
function handleLoginClick(event) {
    event.preventDefault(); // Prevent the default form submission.

    // Get the email and password input values and trim any leading/trailing whitespace.
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if the input values are valid.
    if (isInputValid(email, password)) {
        // If valid, fetch user data from a JSON file.
        fetchUserData(email, password);
    } else {
        // If not valid, show an alert message.
        alert("Please enter both email and password.");
    }
}

// Function to check if email and password input values are valid (non-empty).
function isInputValid(email, password) {
    return email !== "" && password !== "";
}

// Function to fetch user data from a JSON file.
function fetchUserData(email, password) {
    // Make a fetch request to retrieve user data from your JSON file.
    fetch("JSON/User.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            return response.json();
        })
        .then(data => {
            // Find the user in the data using the provided email and password.
            const user = findUser(data.users, email, password);

            if (user) {
                if (user.type === "Delivery Personnel") {
                    // Redirect the delivery personnel to "delivery_page.html".
                    window.location.href = "delivery_main.html";
                } else if (user.type === "Restaurant") {
                    // Redirect restaurant users to "Restaurant_Page.html".
                    successfulLogin_R(user.nickname);
                } else if (user.type === "Customer") {
                    // For other types (Customer), perform a successful login.
                    successfulLogin(user.nickname);
                }
            } else {
                // If no user is found, indicate an unsuccessful login attempt.
                unsuccessfulLogin();
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}



// Function to find a user in the user data array based on email and password.
function findUser(users, email, password) {
    return users && users.find(u => u.email === email && u.password === password);
}

// Function to handle a successful login.
function successfulLogin(nickname) {
    // Display a success message.
    alert("Login successful!");

    // Set cookies to indicate a successful login and store the user's nickname.
    document.cookie = "loginSuccess=true; path=/";
    document.cookie = `nickname=${nickname}; path=/`;

    // Redirect the user to the "index.html" page.
    window.location.href = "index.html";
}

function successfulLogin_R(nickname) {
    // Display a success message.
    alert("Login successful!");

    // Set cookies to indicate a successful login and store the user's nickname.
    document.cookie = "loginSuccess=true; path=/";
    document.cookie = `nickname=${nickname}; path=/`;

    // Redirect the user to the "index.html" page.
    window.location.href = "Restaurant_Page.html";
}

// Function to handle an unsuccessful login attempt.
function unsuccessfulLogin() {
    // Display an error message.
    alert("Invalid email or password. Please try again.");

    // Clear the password input field.
    document.getElementById("password").value = "";
}
