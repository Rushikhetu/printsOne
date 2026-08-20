const API_URL = "https://printsone-backend.onrender.com/api/auth";

const loginForm = document.getElementById("loginForm");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.classList.replace(
            "fa-eye",
            "fa-eye-slash"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.classList.replace(
            "fa-eye-slash",
            "fa-eye"
        );
    }

});


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const identifier =
        document.getElementById("identifier").value.trim();

    const password =
        passwordInput.value;

    if (!identifier || !password) {

        alert("Please enter email/mobile number and password.");

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    identifier: identifier,
                    password: password
                })
            }
        );


        const data = await response.json();


        // ===============================
        // SUCCESS
        // ===============================

        if (response.ok) {

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login Successful 🎉");

            window.location.href = "home.html";

        }

        // ===============================
        // ERROR
        // ===============================

        else {

            alert(
                data.message || "Login failed"
            );

        }

    }

    catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        alert(
            "Could not connect to backend server."
        );

    }

});