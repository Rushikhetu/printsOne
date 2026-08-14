const API_URL = "https://printsone-backend.onrender.com/api/auth";

const signupForm = document.getElementById('signupForm');

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

document.getElementById('togglePassword').addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
    confirmPasswordInput.type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Password check
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Allow only Gmail, Outlook, Yahoo, Hotmail
    const validEmail = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/i;

    // Stop signup if email is invalid
    if (!validEmail.test(email)) {
        alert('Invalid email address');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created successfully 🎉');
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert('Cannot connect to backend server');
    }
});