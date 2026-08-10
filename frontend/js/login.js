// ================================
// PRINTSONE LOGIN PAGE
// ================================

// Password Show / Hide
const password = document.getElementById("password");
const eye = document.getElementById("eye");

if (eye && password) {
    eye.addEventListener("click", () => {

        if (password.type === "password") {
            password.type = "text";
            eye.classList.remove("fa-eye");
            eye.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            eye.classList.remove("fa-eye-slash");
            eye.classList.add("fa-eye");
        }

    });
}

// ================================
// Elements
// ================================

const form = document.querySelector("form");
const email = document.querySelector("input[type='email']");
const remember = document.querySelector("input[type='checkbox']");
const loginButton = document.querySelector("button");

// ================================
// Load Saved Email
// ================================

window.addEventListener("load", () => {

    const savedEmail = localStorage.getItem("printsone_email");

    if (savedEmail) {
        email.value = savedEmail;
        remember.checked = true;
    }

});

// ================================
// Form Validation
// ================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue === "") {
        alert("Please enter your email.");
        email.focus();
        return;
    }

    if (!validateEmail(emailValue)) {
        alert("Please enter a valid email.");
        email.focus();
        return;
    }

    if (passwordValue === "") {
        alert("Please enter your password.");
        password.focus();
        return;
    }

    if (passwordValue.length < 6) {
        alert("Password must contain at least 6 characters.");
        password.focus();
        return;
    }

    // Remember Me

    if (remember.checked) {
        localStorage.setItem("printsone_email", emailValue);
    } else {
        localStorage.removeItem("printsone_email");
    }

    loginAnimation();

});

// ================================
// Login Button Animation
// ================================

function loginAnimation() {

    loginButton.disabled = true;

    loginButton.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Signing In...`;

    setTimeout(() => {

        loginButton.innerHTML =
            `<i class="fa-solid fa-check"></i> Login Successful`;

        loginButton.style.background = "#1d8f35";

    }, 1800);

    setTimeout(() => {

        // Change this after backend integration
        window.location.href = "index.html";

    }, 2600);

}

// ================================
// Email Validation
// ================================

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

// ================================
// Enter Key
// ================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        form.requestSubmit();
    }

});

// ================================
// Input Animation
// ================================

const inputs = document.querySelectorAll(".input-box input");

inputs.forEach((input) => {

    input.addEventListener("focus", () => {

        input.parentElement.style.borderColor = "#111";
        input.parentElement.style.boxShadow =
            "0 0 0 4px rgba(0,0,0,0.08)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.borderColor = "#ececec";
        input.parentElement.style.boxShadow = "none";

    });

});

// ================================
// Floating Entrance Animation
// ================================

window.addEventListener("load", () => {

    document.querySelector(".container").style.opacity = "0";

    setTimeout(() => {

        document.querySelector(".container").style.transition = "1s";
        document.querySelector(".container").style.opacity = "1";

    }, 150);

});