// ================= SIMPLE UI INTERACTIONS =================

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