const splash = document.getElementById("splash");
const website = document.getElementById("website");

const logo = document.querySelector(".logo");
const shine = document.querySelector(".shine");

/* ===========================
   START
=========================== */

window.addEventListener("load", () => {

    /* Logo appears after circle animation */

    setTimeout(() => {

        logo.style.opacity = "1";

    }, 2200);

    /* Shine Effect */

    setTimeout(() => {

        shine.style.animation = "shine 1s linear forwards";

    }, 3200);

    /* Fade Out */

    setTimeout(() => {

        splash.style.transition = "opacity .8s ease";

        splash.style.opacity = "0";

    }, 5500);

    /* Open Home */

    setTimeout(() => {

        splash.style.display = "none";

        website.style.display = "block";

        document.body.style.overflow = "auto";

        // Uncomment if your home page is another file
        // window.location.href = "home.html";

    }, 6300);

});

/* ===========================
   PREVENT IMAGE DRAG
=========================== */

document.addEventListener("dragstart", e => {
    e.preventDefault();
});

/* ===========================
   DISABLE RIGHT CLICK (OPTIONAL)
=========================== */

// document.addEventListener("contextmenu", e => {
//     e.preventDefault();
// });

/* ===========================
   RESET ON RESIZE
=========================== */

window.addEventListener("resize", () => {

    if (window.innerWidth < 768) {

        logo.style.transform = "scale(.9)";

    } else {

        logo.style.transform = "scale(1)";

    }

});