console.log('AUTH JS LOADED');

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log('FORM SUBMITTED');

    const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
    // Save user in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));

    alert('Login Successful 🎉');

    // Redirect back to home page
    window.location.href = 'home.html';
}else {
        alert(data.message);
    }
});