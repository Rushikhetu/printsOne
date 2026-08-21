const API_URL =
    "https://printsone-backend.onrender.com/api";

let allPosters = [];

let currentCategory = "all";


// ========================================
// LOAD PROFILE
// ========================================

function loadProfile() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) return;

    const name =
        user.name ||
        user.username ||
        "User";

    document.getElementById(
        "profileInitial"
    ).textContent =
        name.charAt(0).toUpperCase();
}


// ========================================
// LOAD POSTERS
// ========================================

async function loadPosters() {

    const grid =
        document.getElementById("posterGrid");

    grid.innerHTML =
        `<div class="loading">
            Loading posters...
        </div>`;

    try {

        const response =
            await fetch(
                `${API_URL}/posters`
            );

        if (!response.ok) {

            throw new Error(
                "Failed to load posters"
            );

        }

        const data =
            await response.json();

        allPosters =
            data.posters || [];

        displayPosters(
            allPosters
        );

    }

    catch (error) {

        console.error(
            "POSTER ERROR:",
            error
        );

        grid.innerHTML =
            `<div class="loading">
                Unable to load posters.
            </div>`;
    }
}


// ========================================
// DISPLAY POSTERS
// ========================================

function displayPosters(posters) {

    const grid =
        document.getElementById("posterGrid");

    grid.innerHTML = "";

    if (!posters.length) {

        grid.innerHTML =
            `<div class="loading">
                No posters found.
            </div>`;

        return;
    }


    posters.forEach(poster => {

        const card =
            document.createElement("div");

        card.className =
            "poster-card";


        card.innerHTML = `

            <div class="poster-image">

                <img
                    src="${poster.image_url}"
                    alt="${escapeHTML(poster.name)}"
                    onerror="this.src='assets/logos/logos.png'"
                >

            </div>


            <div class="poster-details">

                <h3>
                    ${escapeHTML(poster.name)}
                </h3>

                <p class="poster-size">
                    ${escapeHTML(poster.size)}
                </p>


                <div class="poster-bottom">

                    <span class="poster-price">
                        ₹${Number(
                            poster.price
                        ).toFixed(2)}
                    </span>


                    <button
                        class="add-cart"
                        onclick="addToCart(${poster.id})"
                        title="Add to Cart"
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                    </button>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });
}


// ========================================
// CATEGORY FILTER
// ========================================

function filterCategory(
    category,
    button
) {

    currentCategory =
        category;


    document
        .querySelectorAll(
            ".category-card"
        )
        .forEach(card => {

            card.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    if (category === "all") {

        displayPosters(
            allPosters
        );

        return;
    }


    const filtered =
        allPosters.filter(
            poster =>
                poster.category
                    .toLowerCase() ===
                category.toLowerCase()
        );


    displayPosters(
        filtered
    );
}


// ========================================
// SHOW ALL
// ========================================

function showAllPosters() {

    currentCategory =
        "all";

    document
        .querySelectorAll(
            ".category-card"
        )
        .forEach(card =>
            card.classList.remove(
                "active"
            )
        );


    document
        .querySelector(
            ".category-card"
        )
        .classList.add(
            "active"
        );


    displayPosters(
        allPosters
    );
}


// ========================================
// SEARCH
// ========================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const search =
                this.value
                    .trim()
                    .toLowerCase();


            let filtered =
                allPosters;


            if (currentCategory !== "all") {

                filtered =
                    filtered.filter(
                        poster =>
                            poster.category
                                .toLowerCase() ===
                            currentCategory
                                .toLowerCase()
                    );

            }


            if (search) {

                filtered =
                    filtered.filter(
                        poster =>
                            poster.name
                                .toLowerCase()
                                .includes(search)
                            ||
                            poster.category
                                .toLowerCase()
                                .includes(search)
                    );

            }


            displayPosters(
                filtered
            );

        }
    );


// ========================================
// ADD TO CART
// ========================================

async function addToCart(
    posterId
) {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        alert(
            "Please login first."
        );

        window.location.href =
            "login.html";

        return;
    }


    const poster =
        allPosters.find(
            p =>
                Number(p.id) ===
                Number(posterId)
        );


    if (!poster) {

        alert(
            "Poster not found."
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/posters/cart`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId:
                            user.id,

                        posterId:
                            poster.id,

                        quantity:
                            1,

                        price:
                            poster.price

                    })
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Poster added to cart 🛒"
            );

            loadCartCount();

        }

        else {

            alert(
                data.message ||
                "Unable to add to cart."
            );

        }

    }

    catch (error) {

        console.error(error);

        alert(
            "Server error."
        );

    }
}


// ========================================
// CART COUNT
// ========================================

async function loadCartCount() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        document.getElementById(
            "cartCount"
        ).textContent = "0";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/posters/cart/${user.id}`
            );


        const data =
            await response.json();


        if (response.ok) {

            const cart =
                data.cart || [];

            document.getElementById(
                "cartCount"
            ).textContent =
                cart.length;

        }

    }

    catch (error) {

        console.error(
            "CART COUNT ERROR:",
            error
        );

    }
}


// ========================================
// OPEN CART
// ========================================

async function openCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );

    modal.classList.add(
        "show"
    );


    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (!user) {

        document.getElementById(
            "cartItems"
        ).innerHTML = `
            <p>
                Please login to view your cart.
            </p>
        `;

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/posters/cart/${user.id}`
            );


        const data =
            await response.json();


        const container =
            document.getElementById(
                "cartItems"
            );


        if (!data.cart ||
            !data.cart.length) {

            container.innerHTML =
                `<p>
                    Your cart is empty.
                </p>`;

            return;
        }


        container.innerHTML = "";


        data.cart.forEach(item => {

            container.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image_url || 'assets/logos/logos.png'}"
                        alt=""
                    >

                    <div class="cart-item-info">

                        <h3>
                            ${escapeHTML(
                                item.name ||
                                "Poster"
                            )}
                        </h3>

                        <p>
                            Quantity:
                            ${item.quantity}
                        </p>

                        <p>
                            ₹${Number(
                                item.price
                            ).toFixed(2)}
                        </p>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            "cartItems"
        ).innerHTML =
            `<p>
                Unable to load cart.
            </p>`;
    }
}


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("show");
}


// ========================================
// SCROLL
// ========================================

function scrollToPosters() {

    document
        .getElementById("postersSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// HERO
// ========================================

function nextHero() {

    document
        .querySelectorAll(".dot")
        .forEach(dot =>
            dot.classList.remove(
                "active"
            )
        );

}

function previousHero() {
    // Reserved for future hero slider
}


// ========================================
// HTML ESCAPE
// ========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


// ========================================
// INITIALIZE
// ========================================

loadProfile();

loadPosters();

loadCartCount();