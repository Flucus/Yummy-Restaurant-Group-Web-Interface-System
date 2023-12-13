function showProfile() {
    var profileSection = document.getElementById("profile-section");
    var orderHistorySection = document.getElementById("order-history-section");

    profileSection.style.display = "block";
    orderHistorySection.style.display = "none";
}

function showOrderHistory() {
    var profileSection = document.getElementById("profile-section");
    var orderHistorySection = document.getElementById("order-history-section");

    profileSection.style.display = "none";
    orderHistorySection.style.display = "block";
}


$(document).ready(function () {
    $(".food-card").hover(function () {
        var foodDescription = $(this).find(".food-description");
        foodDescription.show();
    }, function () {
        var foodDescription = $(this).find(".food-description");
        foodDescription.hide();
    });
});

function togglePopup() {
    const popup = document.getElementById('profile');
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'flex';
    } else {
        popup.style.display = 'none';
    }
}

$(document).ready(function () {
    $("a[href^='#']").click(function (e) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault(); // prevent the default anchor behavior
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000); // 1000ms for animation duration
        }
    });
});

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#scrollTopBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const data = {
        "users": [
            {
                "name": "KC Restaurant",
                "nickname": "Kelvin",
                "password": "Kelvin123",
                "email": "kelvin@vtc.com",
                "phone": "12345678",
                "type": "Restaurant"
            },
            {
                "name": "Soman Tsang",
                "nickname": "Soman",
                "password": "Soman123",
                "email": "soman@vtc.com",
                "phone": "12345678",
                "type": "Customer"
            },
            {
                "name": "Oscar Ho",
                "nickname": "Oscar",
                "password": "Oscar123",
                "email": "oscar@vtc.com",
                "phone": "12345678",
                "type": "Delivery Personnel"
            }
        ]
    };

    function getCookie(name) {
        const cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split('=');
            if (cookiePair[0].trim() === name) {
                return cookiePair[1];
            }
        }
        return null;
    }

    function updateUIOnLogin(nickname) {
        const user = data.users.find(u => u.nickname === nickname);
        const indexLoginButton = document.getElementById("login-btn");
        const indexProfile = document.getElementById("profile-ico");
        const nicknameElement = document.getElementById("nickname");
        const profileSection = document.querySelector(".profile-section");

        if (!user) {
            console.error("User not found!");
            return;
        }

        if (indexLoginButton) {
            indexLoginButton.style.display = 'none';
            indexProfile.style.display = 'flex';
        }

        if (nicknameElement) {
            nicknameElement.textContent = "Hello, " + nickname;
        }

        if (profileSection) {
            profileSection.innerHTML = `
                <h1 id="profile">Profile</h1>
                <p>Hello, ${nickname}! Welcome to your profile.</p>
                <div class="profile-data">
                    <p>Name: ${user.name} <button id="updateNameBtn" class="edit-btn">Edit</button></p>
                    <p>Nickname: ${user.nickname} <button id="updateNicknameBtn" class="edit-btn">Edit</button></p>
                    <p>Phone: ${user.phone} <button id="updatePhoneBtn" class="edit-btn">Edit</button></p>
                    <p>Email: ${user.email} <button id="updateEmailBtn" class="edit-btn">Edit</button></p>
                    <p>Type: ${user.type}</p>
                </div>
                <button id="changePasswordBtn" class="password-change-btn">Change Password</button>
                <h1>Account Management</h1>
                <button id="deleteAccountBtn" class="delete-btn">Disable Account</button>
            `;

            const deleteAccountBtn = profileSection.querySelector("#deleteAccountBtn");
            const changePasswordBtn = profileSection.querySelector("#changePasswordBtn");
            const updateNameBtn = profileSection.querySelector("#updateNameBtn");
            const updateNicknameBtn = profileSection.querySelector("#updateNicknameBtn");
            const updateEmailBtn = profileSection.querySelector("#updateEmailBtn");
            const updatePhoneBtn = profileSection.querySelector("#updatePhoneBtn");

            if (deleteAccountBtn) {
                deleteAccountBtn.addEventListener("click", function () {
                    const isConfirmed = confirm("Are you sure you want to disable your account? This action is irreversible.");
                    if (isConfirmed) {
                        // Logic to delete the account.
                        alert("Account disabled successfully!");
                    } else {
                        alert("Account disable aborted.");
                    }
                });
            }

            if (changePasswordBtn) {
                changePasswordBtn.addEventListener("click", function () {
                    const oldPassword = prompt("Enter your current password:");
                    if (oldPassword !== user.password) {
                        alert('Incorrect old password. Please try again.');
                        return;
                    }
                    const newPassword = prompt("Enter your new password:");
                    const confirmPassword = prompt("Confirm your new password:");
                    if (newPassword && newPassword === confirmPassword) {
                        user.password = newPassword;
                        alert('Password changed successfully!');
                    } else {
                        alert('Passwords do not match or are empty. Please try again.');
                    }
                });
            }

            if (updateNameBtn) {
                updateNameBtn.addEventListener("click", function () {
                    const newName = prompt("Enter your new name:", user.name);
                    if (newName) {
                        user.name = newName;
                        alert('Name updated successfully!');
                    }
                });
            }

            if (updateNicknameBtn) {
                updateNicknameBtn.addEventListener("click", function () {
                    const newNickname = prompt("Enter your new nickname:", user.nickname);
                    if (newNickname) {
                        user.nickname = newNickname;
                        alert('Nickname updated successfully!');
                    }
                });
            }

            if (updateEmailBtn) {
                updateEmailBtn.addEventListener("click", function () {
                    const newEmail = prompt("Enter your new email:", user.email);
                    if (!isValidEmail(newEmail)) {
                        alert('Invalid email format. Please try again.');
                        return;
                    }
                    if (newEmail) {
                        user.email = newEmail;
                        alert('Email updated successfully!');
                    }
                });
            }

            if (updatePhoneBtn) {
                updatePhoneBtn.addEventListener("click", function () {
                    const newPhone = prompt("Enter your new phone number:", user.phone);
                    if (!isValidPhoneNumber(newPhone)) {
                        alert('Invalid phone number. Please try again.');
                        return;
                    }
                    if (newPhone) {
                        user.phone = newPhone;
                        alert('Phone number updated successfully!');
                    }
                });
            }
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
        const phonePattern = /^\d{8}$/;
        return phonePattern.test(phone);
    }


    function logout() {
        document.cookie = "loginSuccess=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "nickname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        const indexLoginButton = document.getElementById("login-btn");
        const indexProfile = document.getElementById("profile-ico");

        if (indexLoginButton) {
            indexLoginButton.style.display = 'block';
            indexProfile.style.display = 'none';
            window.location.href = "index.html";
        }
    }

    function viewOrderHistory() {
        document.querySelectorAll('.food-design').forEach(foodDesign => foodDesign.style.display = 'none');
        document.querySelector('.checkout-form').style.display = 'none';

        const orderList = document.querySelector('.order-list');
        if (orderList) {
            orderList.style.display = 'block';
        }
    }

    function toggleProfile() {
        document.querySelectorAll('.food-design').forEach(foodDesign => foodDesign.style.display = 'none');
        document.querySelector('.checkout-form').style.display = 'none';

        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            profileSection.style.display = 'block';
        }
    }

    // Main
    const loginSuccess = getCookie("loginSuccess");
    if (loginSuccess === "true") {
        const nickname = getCookie("nickname");
        updateUIOnLogin(nickname);
    }

    const logoutButton = document.getElementById("logout_button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    const orderHistoryButton = document.querySelector(".order-history");
    if (orderHistoryButton) {
        orderHistoryButton.addEventListener("click", viewOrderHistory);
    }

    const viewProfileButton = document.getElementById("view-profile");
    if (viewProfileButton) {
        viewProfileButton.addEventListener("click", toggleProfile);
    }

});





// jQuery

$(document).ready(function () {

    let cart = {};

    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    function updateCart(itemName, price) {
        if (cart[itemName]) {
            cart[itemName].quantity += 1;
        } else {
            cart[itemName] = {
                price: parseFloat(price),
                quantity: 1
            };
        }
        renderCart();
    }

    function renderCart() {
        const $cartList = $('#cart-items');
        $cartList.empty();

        let totalAmount = 0;

        for (let itemName in cart) {
            const item = cart[itemName];
            const itemTotal = item.price * item.quantity;

            const cartRow = `
                <div class="cart-row">
                    <div class="cart-attribute">${itemName}</div>
                    <div class="cart-attribute">$${item.price.toFixed(2)}</div>
                    <div class="cart-attribute">
                        <button class="qty-dasc" data-item="${itemName}">-</button>
                        <span class="item-qty">${item.quantity}</span>
                        <button class="qty-asc" data-item="${itemName}">+</button>
                    </div>
                </div>`;

            $cartList.append(cartRow);
            totalAmount += itemTotal;
        }

        $('#total-amount').text('$' + totalAmount.toFixed(2));

        $('.qty-asc').on('click', function () {
            const itemName = $(this).data('item');
            cart[itemName].quantity++;
            renderCart();
        });

        $('.qty-dasc').on('click', function () {
            const itemName = $(this).data('item');
            cart[itemName].quantity--;
            if (cart[itemName].quantity <= 0) delete cart[itemName];
            renderCart();
        });
    }

    $('.add-item').on('click', function () {
        const $foodCard = $(this).closest('.food-card');
        const itemName = $foodCard.find('p:first').text();
        const itemPrice = $foodCard.find('p:last').text().split('$')[1].trim();
        updateCart(itemName, itemPrice);
    });

    $('.buy_again').on('click', function () {
        const $order = $(this).closest('.order');
        $order.find('.order-food-list p').each(function () {
            const foodItem = $(this).text().split(' - ');
            if (foodItem.length === 2) {
                updateCart(foodItem[0].trim(), foodItem[1].trim().replace('$', ''));
            }
        });
    });

    $('.checkout').on('click', function () {
        if (!$.isEmptyObject(cart) && getCookie("loginSuccess") === "true") {
            $('.checkout, .food-design').hide();
            $('.checkout-form').show();
        } else if ($.isEmptyObject(cart)) {
            alert("Your cart is empty. Please add items to your cart before checking out.");
        } else {
            alert("Please login before checking out.");
            window.location.href = "login.html";
        }
    });

    $('.clear-all').on('click', function () {
        cart = {};
        renderCart();
    });

});


window.addEventListener("message", function (event) {
    if (event.data) {
        // Display the alert message received from the iframe
        alert(event.data);
    }
});



// Meun_Management




function showOverlay() {
    $('#overlay').css('display', 'block');
}

function hideOverlay() {
    $('#overlay').css('display', 'none');
}

$(document).ready(function () {
    // Add an event listener to all "Accept" buttons
    $(".Accept").on("click", function () {
        // Find the parent .order element for the clicked button
        var $order = $(this).closest(".order");

        // Find the element containing the status text
        var $statusElement = $order.find("p:contains('Status:')");

        // Replace the text
        $statusElement.text("Status: Preparing Meal");

        //Hide the button
        $(this).hide();

    });

    // Add an event listener to all "Meal Completed" buttons
    $(".MealCompleted").on("click", function () {
        // Find the parent .order element for the clicked button
        var $order = $(this).closest(".order");

        // Find the element containing the status text
        var $statusElement = $order.find("p:contains('Status:')");

        // Replace the text
        $statusElement.text("Status: Waiting to Deliveryman up");

        //Hide the button
        $(this).hide();

    });
});


// Function to open the modal
function openModal() {
    var modal = document.getElementById("contactModal");
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById("contactModal");
    modal.style.display = "none";
}

// Function to open the edit food modal
function openEditFoodModal() {
    var editFoodModal = document.getElementById("editFoodModal");
    editFoodModal.style.display = "block";
}

// Function to close the edit food modal
function closeEditFoodModal() {
    var editFoodModal = document.getElementById("editFoodModal");
    editFoodModal.style.display = "none";
}

// Click event listener for closing modals
window.onclick = function (event) {
    var contactModal = document.getElementById("contactModal");
    var editFoodModal = document.getElementById("editFoodModal");

    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }

    if (event.target == editFoodModal) {
        editFoodModal.style.display = "none";
    }
}

$(document).ready(function () {
    // Add an event listener to all "Accept" buttons
    $(".pickup").on("click", function () {
        // Find the parent .order element for the clicked button
        var $order = $(this).closest(".order");

        // Find the element containing the status text
        var $statusElement = $order.find("p:contains('Status:')");

        // Replace the text
        $statusElement.text("Status: Meals being delivering");

        //Hide the button
        $(this).hide();

    });

    // Add an event listener to all "Meal Completed" buttons
    $(".arrived").on("click", function () {
        // Find the parent .order element for the clicked button
        var $order = $(this).closest(".order");

        // Find the element containing the status text
        var $statusElement = $order.find("p:contains('Status:')");

        // Replace the text
        $statusElement.text("Status: Meal Arrived");

        //Hide the button
        $(this).hide();

    });

    $(".accept").on("click", function () {
        // Find the parent .order element for the clicked button
        var $order = $(this).closest(".order");

        // Find the element containing the status text
        var $statusElement = $order.find("p:contains('Status:')");

        // Replace the text
        $statusElement.text("Status: Order Accepted");

        //Hide the button
        $(this).hide();

    });
});

// Function to toggle the "Arrived" button and hide the "Pickup" button
function toggleArrivedButton(button) {
    const orderNumber = button.getAttribute('data-order-number');
    const pickupButtons = document.querySelectorAll(`.pickup[data-order-number="${orderNumber}"]`);
    const arrivedButtons = document.querySelectorAll(`.arrived[data-order-number="${orderNumber}"]`);

    pickupButtons.forEach(function (pickupButton) {
        pickupButton.style.display = 'none';
    });

    arrivedButtons.forEach(function (arrivedButton) {
        arrivedButton.style.display = 'inline-block'; // Show the Arrived button
    });
}

// Add event listeners to all Pickup buttons
document.addEventListener('DOMContentLoaded', function () {
    const pickupButtons = document.querySelectorAll('.pickup');
    pickupButtons.forEach(function (pickupButton) {
        pickupButton.addEventListener('click', function () {
            toggleArrivedButton(this);
        });
    });
});



