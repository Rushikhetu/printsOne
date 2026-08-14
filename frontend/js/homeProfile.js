const user = JSON.parse(localStorage.getItem('user'));

const loginLink = document.getElementById('loginLink');
const profileCircle = document.getElementById('profileCircle');

if (user && user.name) {
    // Hide login link
    loginLink.style.display = 'none';

    // Show profile circle
    profileCircle.style.display = 'flex';

    // First letter of user name
    profileCircle.textContent = user.name.charAt(0).toUpperCase();

    // Open profile page when clicked
    profileCircle.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
}