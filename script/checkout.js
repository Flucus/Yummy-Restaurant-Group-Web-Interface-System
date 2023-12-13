// Wait for the DOM content to be fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the order form and place order button.
    const orderForm = document.getElementById("order-form");
    const placeOrderButton = document.getElementById("place-order-button");

    // Define an array of required form field IDs.
    const requiredFields = ["full-name", "credit-card", "expiration-date", "cvv", "room", "block", "floor", "street", "district"];

    // Function to send a notification message to the parent window.
    const notify = (message) => window.parent.postMessage(message, "*");

    // Function to find the first missing required field.
    function findMissingField() {
        return requiredFields.find(fieldName => !document.getElementById(fieldName).value);
    }

    // Function to validate the credit card number.
    function isValidCreditCard() {
        // Credit card pattern: matches a credit card number of exactly 16 digits.
        return /^\d{16}$/.test(document.getElementById("credit-card").value);
    }

    // Check if the order form and place order button exist.
    if (orderForm && placeOrderButton) {
        // Add a click event listener to the place order button.
        placeOrderButton.addEventListener("click", event => {
            event.preventDefault();

            // Find the first missing required field.
            const missingField = findMissingField();
            if (missingField) {
                notify(`Please fill in the ${missingField.replace('-', ' ')} field.`);
                return;
            }

            // Check if the credit card number is valid.
            if (!isValidCreditCard()) {
                notify("Please enter a valid credit card number.");
                return;
            }

            // Submit the order form if all validations pass.
            orderForm.submit();
        });
    }
});
