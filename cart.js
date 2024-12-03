let cart = [];




const iconCart = document.getElementById('iconCart');
const closeCart = document.querySelector('.close');
const checkOutButton = document.querySelector('.checkOut');
const listCart = document.querySelector('.listCart');
const body = document.body;
const cartTab = document.querySelector('.cartTab');




iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    cartTab.classList.toggle('hidden');
});




checkOutButton.addEventListener('click', () => {
    console.log('Check Out clicked!');
    checkOut();
});


closeCart.addEventListener('click', () => {
    console.log('Close button clicked!');
    if (cartTab) {
        cartTab.classList.add('hidden');
        console.log('Cart tab class:', cartTab.className);
    } else {
        console.error('cartTab element is not found!');
    }
});


function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}




function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    updateCartIcon();
}


function updateCartIcon() {
    const cartIcon = document.querySelector('.icon-cart');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = cartIcon.querySelector('.cart-count');


    if (countElement) {
        countElement.textContent = cartCount;
    } else {
        const newCount = document.createElement('span');
        newCount.className = 'cart-count';
        newCount.textContent = cartCount;
        cartIcon.appendChild(newCount);
    }
}


function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}


function checkOut() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    saveCart();
    updateCartUI();
}


function updateCartUI() {
    listCart.innerHTML = '';


    if (cart.length === 0) {
        listCart.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p>${item.name} - php ${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            listCart.appendChild(cartItem);
        });
    }
}


window.addEventListener('DOMContentLoaded', () => {
    loadCart();
});


        // Function to add a product to the cart
        function addToCart(name, price) {
            // Check if the product is already in the cart
            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        }


    // Function to update the cart table
    function updateCart() {
        const tableBody = document.querySelector('#cart-table tbody');
        tableBody.innerHTML = ''; // Clear existing rows


        let total = 0;


        cart.forEach((item, index) => {
            const row = document.createElement('tr');


            // Product name
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);


            // Price
            const priceCell = document.createElement('td');
            priceCell.textContent = `php ${item.price}`;
            row.appendChild(priceCell);


            // Quantity
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);


            // Total
            const totalCell = document.createElement('td');
            const productTotal = item.price * item.quantity;
            total += productTotal;
            totalCell.textContent = `php ${productTotal}`;
            row.appendChild(totalCell);


            // Remove button
            const actionCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeFromCart(index);
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);


            tableBody.appendChild(row);
        });


        // Update total amount
        document.getElementById('total-amount').textContent = `Total: php ${total}`;
    }


    // Function to remove a product from the cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }
