const API_URL =
    "https://printsone-backend.onrender.com/api";

let allBouquets = [];


// =====================================================
// LOAD BOUQUETS
// =====================================================

async function loadBouquets() {

    const grid =
        document.getElementById("bouquetGrid");

    grid.innerHTML =
        `<p class="loading">Loading bouquets...</p>`;

    try {

        const response =
            await fetch(`${API_URL}/bouquets`);

        if (!response.ok) {
            throw new Error("Failed to load bouquets");
        }

        allBouquets =
            await response.json();

        displayBouquets(allBouquets);

    } catch (error) {

        console.error(error);

        grid.innerHTML =
            `<p>Unable to load bouquets.</p>`;
    }
}


// =====================================================
// DISPLAY
// =====================================================

function displayBouquets(bouquets) {

    const grid =
        document.getElementById("bouquetGrid");

    grid.innerHTML = "";

    if (bouquets.length === 0) {

        grid.innerHTML =
            `<p>No bouquets found.</p>`;

        return;
    }


    bouquets.forEach(bouquet => {

        const card =
            document.createElement("div");

        card.className =
            "bouquet-card";


        card.innerHTML = `

            <div class="bouquet-image">

                <img
                    src="${bouquet.image}"
                    alt="${bouquet.name}"
                    onerror="this.src='assets/logos/logos.png'"
                >

            </div>


            <div class="bouquet-info">

                <h3>
                    ${bouquet.name}
                </h3>

                <div class="price">
                    ₹${Number(bouquet.price).toFixed(2)}
                </div>


                <div class="rating-row">

                    <div class="rating">

                        <i class="fa-solid fa-star"></i>

                        ${bouquet.rating}

                        (${bouquet.review_count || 0})

                    </div>


                    <button
                        class="cart-button"
                        onclick="addToCart(${bouquet.id})"
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                    </button>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });

}


// =====================================================
// FILTER OCCASION
// =====================================================

function filterOccasion(occasion) {

    const filtered =
        allBouquets.filter(
            bouquet =>
                bouquet.occasion === occasion
        );

    displayBouquets(filtered);

    document
        .getElementById("bouquetSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =====================================================
// ALL
// =====================================================

function loadAllBouquets() {

    displayBouquets(allBouquets);

    document
        .getElementById("bouquetSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =====================================================
// SEARCH
// =====================================================

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const search =
            this.value
                .toLowerCase()
                .trim();


        if (!search) {

            displayBouquets(allBouquets);

            return;
        }


        const filtered =
            allBouquets.filter(
                bouquet =>
                    bouquet.name
                        .toLowerCase()
                        .includes(search)
                    ||
                    bouquet.occasion
                        .toLowerCase()
                        .includes(search)
            );


        displayBouquets(filtered);

    });


// =====================================================
// ADD TO CART
// =====================================================

async function addToCart(bouquetId) {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/cart`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId: user.id,

                        productType:
                            "bouquet",

                        productId:
                            bouquetId,

                        quantity: 1

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to add to cart."
            );

            return;
        }


        alert(
            "Bouquet added to cart 🛒"
        );

        updateCartCount();

    } catch (error) {

        console.error(error);

        alert(
            "Server error."
        );
    }
}


// =====================================================
// CART COUNT
// =====================================================

async function updateCartCount() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        document
            .getElementById("cartCount")
            .textContent = "0";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/cart/${user.id}`
            );


        if (!response.ok) return;


        const data =
            await response.json();


        document
            .getElementById("cartCount")
            .textContent =
            data.cart.length;

    } catch (error) {

        console.error(error);
    }
}


// =====================================================
// CART
// =====================================================

function openCart() {

    window.location.href =
        "cart.html";
}


// =====================================================
// HERO SLIDER
// =====================================================

const heroImages = [

    "assets/bouquets/pink-bouquet.png",

    "assets/bouquets/red-bouquet.png",

    "assets/bouquets/yellow-bouquet.png",

    "assets/bouquets/colorful-bouquet.png",

    "assets/bouquets/white-bouquet.png"

];

let heroIndex = 0;


function showHero(index) {

    if (index < 0) {
        heroIndex =
            heroImages.length - 1;
    }

    else if (
        index >= heroImages.length
    ) {
        heroIndex = 0;
    }

    else {
        heroIndex = index;
    }


    document
        .getElementById("heroImage")
        .src =
        heroImages[heroIndex];


    document
        .querySelectorAll(".dot")
        .forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === heroIndex
                );

            }
        );
}


function nextHero() {

    showHero(heroIndex + 1);
}


function previousHero() {

    showHero(heroIndex - 1);
}


// Auto slider

setInterval(
    () => nextHero(),
    5000
);


// =====================================================
// SHOP NOW
// =====================================================

function scrollToBouquets() {

    document
        .getElementById("bouquetSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =====================================================
// PROFILE
// =====================================================

function loadProfile() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) return;


    const name =
        user.name || "User";


    document
        .getElementById("profileInitial")
        .textContent =
        name.charAt(0).toUpperCase();
}


// =====================================================
// START
// =====================================================

loadBouquets();

updateCartCount();

loadProfile();