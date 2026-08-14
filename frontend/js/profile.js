const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'login.html';
} else {
    const firstLetter = user.name.charAt(0).toUpperCase();

    // Avatar circles
    document.getElementById('avatarCircle').textContent = firstLetter;
    document.getElementById('topProfile').textContent = firstLetter;

    // Main profile info
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profilePhone').textContent = '+91 ' + user.phone;

    // Personal info section
    document.getElementById('fullName').textContent = user.name;
    document.getElementById('emailAddress').textContent = user.email;
    document.getElementById('mobileNumber').textContent = '+91 ' + user.phone;
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'home.html';
}