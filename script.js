const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 800 },
    { id: 3, name: "Headphones", price: 200 }
];

let cart = [];

const productsList = document.getElementById("productsList");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const emptyCartBtn = document.getElementById("emptyCartBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

function renderProducts(list) {
    productsList.replaceChildren();

    list.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to cart";
        button.dataset.productId = product.id;

        card.append(name, price, button);
        productsList.appendChild(card);
    });
}

function renderCart() {
    cartList.replaceChildren();

    let count = 0;
    let total = 0;

    cart.forEach(function(item) {
        const product = products.find(function(product) {
            return product.id === item.productId;
        });

        if (!product) {
            return;
        }

        count += item.quantity;
        total += product.price * item.quantity;

        const card = document.createElement("div");
        card.className = "cart-item";

        const name = document.createElement("p");
        name.textContent = product.name;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price * item.quantity;

        const button = document.createElement("button");
        button.textContent = "Remove";
        button.dataset.productId = product.id;

        card.append(name, quantity, price, button);
        cartList.appendChild(card);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

productsList.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-product-id]");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.productId);
    const product = products.find(function(product) {
        return product.id === productId;
    });

    if (!product) {
        return;
    }

    const cartItem = cart.find(function(item) {
        return item.productId === productId;
    });

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ productId: productId, quantity: 1 });
    }

    renderCart();
});

cartList.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-product-id]");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.productId);
    cart = cart.filter(function(item) {
        return item.productId !== productId;
    });

    renderCart();
});

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText);
    });

    renderProducts(filteredProducts);
});

emptyCartBtn.addEventListener("click", function() {
    cart = [];
    renderCart();
});

darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkModeBtn.textContent = "Light mode";
    } else {
        darkModeBtn.textContent = "Dark mode";
    }
});

renderProducts(products);
renderCart();
