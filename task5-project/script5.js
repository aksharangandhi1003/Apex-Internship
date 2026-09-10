/* =====================================================
   TASK 5 - E-COMMERCE WEB APPLICATION
   JavaScript
===================================================== */


/* ================= PRODUCT DATA ================= */

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.8,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3299,
        rating: 4.6,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 799,
        rating: 4.5,
        icon: "👕"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 2199,
        rating: 4.7,
        icon: "👟"
    },
    {
        id: 5,
        name: "Leather Wallet",
        category: "accessories",
        price: 999,
        rating: 4.4,
        icon: "👛"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 1299,
        rating: 4.6,
        icon: "🕶️"
    },
    {
        id: 7,
        name: "Table Lamp",
        category: "home",
        price: 1499,
        rating: 4.3,
        icon: "💡"
    },
    {
        id: 8,
        name: "Coffee Mug",
        category: "home",
        price: 499,
        rating: 4.7,
        icon: "☕"
    }
];


/* ================= CART ================= */

// Get saved cart from Local Storage
let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];


/* ================= DOM ELEMENTS ================= */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const themeBtn = document.getElementById("themeBtn");

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(productList) {

    productGrid.innerHTML = "";

    const noProducts = document.getElementById("noProducts");

    if (productList.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


/* ================= FILTER PRODUCTS ================= */

function filterProducts() {

    let result = [...products];

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const sort =
        sortFilter.value;


    // Search
    if (searchValue !== "") {

        result = result.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );
    }


    // Category
    if (category !== "all") {

        result = result.filter(product =>
            product.category === category
        );
    }


    // Sorting
    if (sort === "low") {

        result.sort((a, b) => a.price - b.price);

    } else if (sort === "high") {

        result.sort((a, b) => b.price - a.price);

    } else if (sort === "rating") {

        result.sort((a, b) => b.rating - a.rating);

    } else if (sort === "name") {

        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }


    displayProducts(result);
}


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    const existingItem =
        cart.find(item => item.id === productId);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }


    saveCart();

    updateCart();

    alert(`${product.name} added to cart!`);
}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );
}


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; color:#777;">
                Your cart is empty 🛒
            </p>
        `;

    }


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-icon">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <strong>${item.name}</strong>

                <div>
                    ₹${item.price.toLocaleString("en-IN")}
                </div>

                <div class="quantity-buttons">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        totalPrice.toLocaleString("en-IN");

    saveCart();
}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== productId);
    }


    updateCart();
}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    updateCart();
}


/* ================= OPEN CART ================= */

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");
});


/* ================= CLOSE CART ================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");
}

closeCart.addEventListener(
    "click",
    closeCartSidebar
);

cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* ================= CHECKOUT ================= */

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for shopping with ShopEase! 🎉"
    );

    cart = [];

    updateCart();

    closeCartSidebar();
});


/* ================= SEARCH & FILTER EVENTS ================= */

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

sortFilter.addEventListener(
    "change",
    filterProducts
);


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");
});


/* Close menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
    });
});


/* ================= DARK MODE ================= */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "shopEaseTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "shopEaseTheme",
            "light"
        );
    }
});


/* Load saved theme */

const savedTheme =
    localStorage.getItem("shopEaseTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
}


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill all fields.";

        formMessage.style.color = "red";

        return;
    }


    // Basic email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.style.color = "red";

        return;
    }


    formMessage.textContent =
        "Message sent successfully! ✅";

    formMessage.style.color = "green";


    contactForm.reset();
});


/* ================= INITIAL LOAD ================= */

displayProducts(products);

updateCart();