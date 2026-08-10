// ================= SIMPLE UI INTERACTIONS =================
const API_BASE = 'https://printsone-backend.onrender.com';

async function testBackend() {
    try {
        const response = await fetch(`${API_BASE}/`);
        const data = await response.text();
        console.log(data);
    } catch (err) {
        console.error('Backend connection failed:', err);
    }
}

testBackend();
// Wishlist toggle
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    });
});

// Customize buttons
document.querySelectorAll('.customize-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'customize.html';
    });
});

// Smooth scroll for navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');

        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple cart badge animation
const cartBadge = document.querySelector('.cart-badge');

if (cartBadge) {
    cartBadge.addEventListener('mouseenter', () => {
        cartBadge.style.transform = 'scale(1.15)';
    });

    cartBadge.addEventListener('mouseleave', () => {
        cartBadge.style.transform = 'scale(1)';
    });
}