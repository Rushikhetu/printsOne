const API_URL = "https://printsone-backend.onrender.com/api";


// ========================================
// STICKER DATA
// ========================================

const stickers = [

    // Animals
    { emoji: "🐕", category: "animals" },
    { emoji: "🐼", category: "animals" },
    { emoji: "🐱", category: "animals" },
    { emoji: "🐶", category: "animals" },
    { emoji: "🦊", category: "animals" },
    { emoji: "🐨", category: "animals" },

    // Emoji
    { emoji: "😊", category: "emoji" },
    { emoji: "😎", category: "emoji" },
    { emoji: "😍", category: "emoji" },
    { emoji: "😂", category: "emoji" },
    { emoji: "😈", category: "emoji" },
    { emoji: "🤩", category: "emoji" },

    // Quotes
    { emoji: "❤️", category: "quotes" },
    { emoji: "🔥", category: "quotes" },
    { emoji: "✨", category: "quotes" },
    { emoji: "💯", category: "quotes" },
    { emoji: "NO\nBAD", category: "quotes" },

    // Hobby
    { emoji: "🎮", category: "hobby" },
    { emoji: "🎵", category: "hobby" },
    { emoji: "⚽", category: "hobby" },
    { emoji: "📷", category: "hobby" },
    { emoji: "🎸", category: "hobby" },
    { emoji: "☕", category: "hobby" }
];


let currentCategory = "all";

let zoom = 1;

let history = [];

let historyIndex = -1;

let currentDesign = {
    type: "sticker",
    value: "🐼",
    background: "transparent",
    borderEnabled: true,
    borderColor: "#000000",
    borderWidth: 4,
    quantity: 10,
    size: "Medium (3 x 3 in)"
};


// ========================================
// ELEMENTS
// ========================================

const designContent =
    document.getElementById("designContent");

const designBorder =
    document.getElementById("designBorder");

const stickerCanvas =
    document.getElementById("stickerCanvas");

const stickerGrid =
    document.getElementById("stickerGrid");

const imageInput =
    document.getElementById("imageInput");


// ========================================
// LOAD STICKERS
// ========================================

function loadStickers(category = "all") {

    stickerGrid.innerHTML = "";

    stickers
        .filter(sticker =>
            category === "all" ||
            sticker.category === category
        )
        .forEach(sticker => {

            const item =
                document.createElement("div");

            item.className = "sticker-item";

            item.textContent = sticker.emoji;

            item.onclick = () => {

                selectSticker(sticker.emoji);

            };

            stickerGrid.appendChild(item);

        });
}


// ========================================
// SELECT STICKER
// ========================================

function selectSticker(value) {

    saveHistory();

    currentDesign.type = "sticker";

    currentDesign.value = value;

    designContent.textContent = value;

    designContent.style.fontSize = "190px";

}


// ========================================
// FILTER
// ========================================

function filterStickers(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".category")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");

    loadStickers(category);
}


function showAllStickers() {

    currentCategory = "all";

    loadStickers("all");

}


// ========================================
// TEXT
// ========================================

function addText() {

    const text =
        prompt("Enter your sticker text:");

    if (!text) return;

    saveHistory();

    currentDesign.type = "text";

    currentDesign.value = text;

    designContent.textContent = text;

    designContent.style.fontSize = "65px";

    designContent.style.fontWeight = "700";

    designContent.style.textAlign = "center";

}


// ========================================
// IMAGE UPLOAD
// ========================================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {

        alert("Image must be smaller than 5MB.");

        return;
    }

    const reader =
        new FileReader();

    reader.onload = function (event) {

        saveHistory();

        currentDesign.type = "image";

        currentDesign.value =
            event.target.result;

        designContent.innerHTML = "";

        const img =
            document.createElement("img");

        img.src =
            event.target.result;

        img.style.width = "220px";

        img.style.maxHeight = "220px";

        img.style.objectFit = "contain";

        designContent.appendChild(img);

    };

    reader.readAsDataURL(file);

});


// ========================================
// BACKGROUND
// ========================================

function changeBackground(color, button) {

    saveHistory();

    currentDesign.background = color;

    designBorder.style.background =
        color === "transparent"
            ? "white"
            : color;

    document
        .querySelectorAll(".color")
        .forEach(c =>
            c.classList.remove("active")
        );

    button.classList.add("active");

}


// ========================================
// BORDER
// ========================================

function toggleBorder() {

    saveHistory();

    const enabled =
        document.getElementById("borderToggle").checked;

    currentDesign.borderEnabled =
        enabled;

    designBorder.style.border =
        enabled
            ? `${currentDesign.borderWidth}px solid ${currentDesign.borderColor}`
            : "none";
}


function changeBorderColor(color) {

    saveHistory();

    currentDesign.borderColor = color;

    if (currentDesign.borderEnabled) {

        designBorder.style.border =
            `${currentDesign.borderWidth}px solid ${color}`;

    }
}


function changeBorderWidth(width) {

    currentDesign.borderWidth =
        Number(width);

    document.getElementById(
        "borderWidthValue"
    ).textContent =
        `${width}px`;

    if (currentDesign.borderEnabled) {

        designBorder.style.border =
            `${width}px solid ${currentDesign.borderColor}`;

    }
}


// ========================================
// ZOOM
// ========================================

function zoomIn() {

    zoom += 0.1;

    if (zoom > 2) zoom = 2;

    stickerCanvas.style.transform =
        `scale(${zoom})`;
}


function zoomOut() {

    zoom -= 0.1;

    if (zoom < 0.5) zoom = 0.5;

    stickerCanvas.style.transform =
        `scale(${zoom})`;
}


// ========================================
// RESET
// ========================================

function resetDesign() {

    if (!confirm("Reset your design?")) {
        return;
    }

    currentDesign = {
        type: "sticker",
        value: "🐼",
        background: "transparent",
        borderEnabled: true,
        borderColor: "#000000",
        borderWidth: 4,
        quantity: 10,
        size: "Medium (3 x 3 in)"
    };

    designContent.innerHTML = "🐼";

    designContent.style.fontSize =
        "190px";

    designBorder.style.background =
        "white";

    designBorder.style.border =
        "4px solid black";

    zoom = 1;

    stickerCanvas.style.transform =
        "scale(1)";

    updatePrice();
}


// ========================================
// UNDO / REDO
// ========================================

function saveHistory() {

    history =
        history.slice(0, historyIndex + 1);

    history.push(
        JSON.stringify(currentDesign)
    );

    historyIndex++;

}


function undo() {

    if (historyIndex <= 0) {
        return;
    }

    historyIndex--;

    const state =
        JSON.parse(history[historyIndex]);

    restoreState(state);
}


function redo() {

    if (
        historyIndex >=
        history.length - 1
    ) {
        return;
    }

    historyIndex++;

    const state =
        JSON.parse(history[historyIndex]);

    restoreState(state);
}


function restoreState(state) {

    currentDesign = state;

    if (state.type === "sticker") {

        designContent.innerHTML =
            state.value;

        designContent.style.fontSize =
            "190px";

    }

    else if (state.type === "text") {

        designContent.innerHTML =
            state.value;

        designContent.style.fontSize =
            "65px";

    }

    designBorder.style.background =
        state.background === "transparent"
            ? "white"
            : state.background;

    designBorder.style.border =
        state.borderEnabled
            ? `${state.borderWidth}px solid ${state.borderColor}`
            : "none";

}


// ========================================
// PRICE
// ========================================

function updatePrice() {

    const quantity =
        Number(
            document.getElementById("quantity").value
        );

    currentDesign.quantity =
        quantity;

    let price = 199;

    if (quantity === 20) {
        price = 349;
    }

    if (quantity === 50) {
        price = 699;
    }

    if (quantity === 100) {
        price = 1199;
    }

    document.getElementById("price")
        .textContent =
        `₹${price.toFixed(2)}`;

}


// ========================================
// PREVIEW
// ========================================

function previewDesign() {

    alert(
        "Your sticker preview is ready!"
    );

}


// ========================================
// SAVE DESIGN
// ========================================

async function saveDesign() {

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
                `${API_URL}/stickers/design`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId: user.id,

                        design: currentDesign

                    })
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Design saved successfully 🎉"
            );

        } else {

            alert(
                data.message ||
                "Unable to save design."
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
// ADD TO CART
// ========================================

async function addToCart() {

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


    const quantity =
        Number(
            document.getElementById("quantity").value
        );


    let price = 199;

    if (quantity === 20) {
        price = 349;
    }

    if (quantity === 50) {
        price = 699;
    }

    if (quantity === 100) {
        price = 1199;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/stickers/cart`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId: user.id,

                        productType:
                            "sticker",

                        design:
                            currentDesign,

                        quantity:
                            quantity,

                        price:
                            price

                    })
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Sticker added to cart 🛒"
            );

        } else {

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
// PROFILE INITIAL
// ========================================

function loadProfile() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) return;

    const name =
        user.name || "User";

    document.getElementById(
        "profileInitial"
    ).textContent =
        name.charAt(0).toUpperCase();

}


// ========================================
// INITIALIZE
// ========================================

loadStickers();

loadProfile();

updatePrice();

saveHistory();