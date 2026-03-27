function showAlert() {
    alert("You clicked the button!");
}

function showAboutAlert() {
    alert("You are cordially invited to feel the atmosphere and sample the food at Eastern Balti House, located in Monaghan Town.");
}

function showAboutAlertUpdate() {
    alert("Don't feel shy to check our restaurant or takeaway out.")
}

function showHomeAlert() {
    alert(
        "Welcome to Eastern Balti House, where we serve delicious and authentic Indian cuisine.\n\n" +
        "We are located in Monaghan Town and offer both dine-in and takeaway options.\n\n" +
        "Our menu features a variety of dishes, including our famous Balti curries, as well as vegetarian and vegan options.\n\n" +
        "We pride ourselves on using fresh ingredients and traditional cooking methods to create flavourful and satisfying meals.\n\n" +
        "Whether you're in the mood for a quick collection or a leisurely dinner, we invite you to come and experience the taste of India at Eastern Balti House."
    );
}


function showInfo() {
    alert(
        "Taste our wonderful wide range of dishes suitable for all tastes and preference"
    );
}
function confirmContact() {
    // Navigate to the contact page when the homepage button is clicked
    window.location.href = "contact.html";
}

// Display a welcome message when the page loads
window.onload = function() {
    // Check if the current page is the home page (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        this.alert("Welcome to our website!");
    }
};

/* =============================================================
   NEW FEATURE 1: Show today's date on the page (if an element exists)
   How students test it:
   - Add this to HTML: <p id="today-date"></p>
   - Refresh the page and the date will appear
============================================================ */
let dateBox = document.getElementById("today-date");
if (dateBox) {
    let today = new Date();
    dateBox.textContent = "Today's date: " + today.toDateString();
}

let originalColour = "#ffffff"; // Original background colour
let newColour = "#9C8386"; // New background colour, let it be the theme colour for this company

function changeBackgroundColour() {
    // Get the current background colour using getComputedStyle
    let currentColour = window.getComputedStyle(document.body).backgroundColor;
    // Convert RGB to HEX for better comparison
    currentColour = rgbToHex(currentColour);

    if (currentColour == newColour) {
        // If the current colour is the new one, change it back to the original colour
        document.body.style.backgroundColor = originalColour;   
    } else {
        // Otherwise, change it to the new colour
        document.body.style.backgroundColor = newColour;
    }
}

// Function to convert RGB to HEX format
function rgbToHex(rgb) {
    let result = rgb.match(/\d+/g); // Extract the numbers from the RGB string
    return "#" + result.map(x => {
        return ("0" + parseInt(x).toString(16)).slice(-2); // Convert each number to HEX
    }).join("");
}

// The below message holds vital information for getting to see the "current" Eastern Balti House
function showAnotherUpdate() {
    alert(
        "Don't worry, the place has changed its ambience and versatility since the publication of this video.\n\n" +
        "The restaurant theme has been completely revamped. Likewise for the tables more recently last year. \n\n" +
        "All takeaway business has been relocated in the bottom floor next door, showing another new appearance in the business."
    );
}

// Contact Us page alert
function showContactAlert() {
    alert("Contact us through the Contact Form, or even so call us on our number, send a letter to our address, or walk in if you have anything on your mind.");
}

// Contact Us button alert
function showServicesAlert() {
    alert("If you have any concerns, make sure to let the staff know, and surely we will be at your service.");
}

// === Menu + cart + checkout functionality for QQI Level 5 ===
const MENU_ITEMS = [
    { id: 1, name: "Chicken Balti", category: "Mains", price: 12.50, desc: "This is a very special dish from South India. Diced chicken cooked with fine ginger & garlic, balti paste, medium spice, topped with fresh coriander and tomatoes." },
    { id: 2, name: "Vegetable Biryani", category: "Mains", price: 12.95, desc: "Mix of fresh vegetables cooked with basmati pilau rice and flavoured with saffron, mild Indian spices & garnished with coriander and served with the house special sauce on the side." },
    { id: 3, name: "Chicken Pakora", category: "Starters", price: 6.50, desc: "Barbequed breast of chicken, sliced, coated in breadcrumbs and deep fried." },
    { id: 4, name: "Onion Bhaji", category: "Starters", price: 5.50, desc: "A delicious preparation of finely sliced onions, ground lentils, flavour of mixed spices and deep fried.. a tasty simulator." },
];
const CART_KEY = "ebh-cart";

function getCart() {
    let cartJson = localStorage.getItem(CART_KEY);
    if (!cartJson) return [];
    try { return JSON.parse(cartJson); } catch (e) { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCounter() {
    let countElem = document.getElementById("cart-count");
    if (!countElem) return;
    let cart = getCart();
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countElem.textContent = totalQty;
    let totalPriceElem = document.getElementById("cart-total");
    if (totalPriceElem) totalPriceElem.textContent = "€" + cart.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2);
}

function renderMenuItems() {
    let menuContainer = document.getElementById("menu-items");
    if (!menuContainer) return;

    let categories = [...new Set(MENU_ITEMS.map(i => i.category))];
    menuContainer.innerHTML = "";

    categories.forEach(cat => {
        let section = document.createElement("section");
        section.className = "menu-category";
        section.innerHTML = `<h3>${cat}</h3>`;

        MENU_ITEMS.filter(item => item.category === cat).forEach(item => {
            let card = document.createElement("article");
            card.className = "menu-item";
            card.innerHTML = `
                <h4>${item.name} <span class="price">€${item.price.toFixed(2)}</span></h4>
                <p>${item.desc}</p>
                <div class="item-actions">
                    <label for="qty-${item.id}">Qty</label>
                    <input id="qty-${item.id}" type="number" min="1" value="1" aria-label="Quantity for ${item.name}" />
                    <button type="button" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            `;
            section.appendChild(card);
        });

        menuContainer.appendChild(section);
    });

    updateCartCounter();
}

function addToCart(itemId) {
    let item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    let qtyInput = document.getElementById("qty-" + itemId);
    let qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;

    let cart = getCart();
    let existing = cart.find(i => i.id === itemId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: itemId, name: item.name, price: item.price, qty });
    }
    saveCart(cart);
    updateCartCounter();
    alert(`${qty} x ${item.name} added to cart`);
}

function setCartRow(id, qty) {
    let cart = getCart();
    let item = cart.find(x => x.id === id);
    if (!item) return;
    item.qty = qty;
    if (item.qty <= 0) {
        cart = cart.filter(x => x.id !== id);
    }
    saveCart(cart);
    renderCheckoutCart();
}

function renderCheckoutCart() {
    let cartSection = document.getElementById("cart-items");
    let totalElem = document.getElementById("checkout-total");
    if (!cartSection) return;

    let cart = getCart();
    if (!cart.length) {
        cartSection.innerHTML = "<p>Your cart is empty. Visit <a href='menu.html'>Menu</a> to add items.</p>";
        if (totalElem) totalElem.textContent = "€0.00";
        return;
    }

    let total = 0;
    cartSection.innerHTML = "";
    let table = document.createElement("table");
    table.className = "checkout-table";
    table.innerHTML = `
        <thead><tr><th>Dish</th><th>Unit</th><th>Qty</th><th>Subtotal</th><th>Adjust</th></tr></thead>
        <tbody></tbody>
    `;

    cart.forEach(item => {
        let subtotal = item.qty * item.price;
        total += subtotal;
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>€${item.price.toFixed(2)}</td>
            <td><input type="number" min="0" value="${item.qty}" onchange="setCartRow(${item.id}, this.value)" /></td>
            <td>€${subtotal.toFixed(2)}</td>
            <td><button type="button" onclick="setCartRow(${item.id}, ${item.qty - 1})">-</button> <button type="button" onclick="setCartRow(${item.id}, ${item.qty + 1})">+</button></td>
        `;
        table.querySelector("tbody").appendChild(row);
    });

    cartSection.appendChild(table);
    if (totalElem) totalElem.textContent = "€" + total.toFixed(2);
    updateCartCounter();
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCounter();
    renderCheckoutCart();
    let msg = document.getElementById("checkout-message");
    if (msg) msg.textContent = "Cart has been cleared.";
}

function placeOrder() {
    let cart = getCart();
    let message = document.getElementById("checkout-message");
    if (!cart.length) {
        if (message) message.textContent = "Your cart is empty. Add items first.";
        return;
    }

    let name = document.getElementById("customer-name")?.value.trim();
    let email = document.getElementById("customer-email")?.value.trim();
    let phone = document.getElementById("customer-phone")?.value.trim();
    let address = document.getElementById("customer-address")?.value.trim();

    if (!name || !email || !phone || !address) {
        if (message) message.textContent = "Please complete all delivery fields.";
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    clearCart();

    if (message) {
        message.innerHTML = `<strong>Order Confirmed!</strong> Thank you ${name}.<br>Your order total is €${total.toFixed(2)}. We will contact you at ${email} or ${phone}.`;
    }
}

function hookMenuAndCheckoutEvents() {
    let hasMenu = document.getElementById("menu-items");
    let hasCheckout = document.getElementById("checkout-form");

    if (hasMenu) {
        renderMenuItems();
    }

    if (hasCheckout) {
        renderCheckoutCart();
    }

    // support old menu button in case it still exists (not needed now), and update totals
    let gotoCheckoutBtn = document.getElementById("goto-checkout");
    if (gotoCheckoutBtn) {
        gotoCheckoutBtn.addEventListener("click", () => {
            window.location.hash = "#checkout-form";
        });
    }

    updateCartCounter();
}

// Call after the page has loaded enough elements
window.addEventListener('DOMContentLoaded', hookMenuAndCheckoutEvents);

function FunFact() {
    alert("In the first building of this new company based in Monaghan, we had a lunch buffet every Sunday, before moving over to our current building on the opposite side of the street.");
}