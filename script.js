document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Login Modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginStatus = document.getElementById('login-status');
    const closeBtns = document.querySelectorAll('.close');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('loggedInUser', username);
        loginStatus.textContent = `Logged in as ${username}`;
        loginModal.style.display = 'none';
        loginBtn.textContent = 'Logged In';
        loginBtn.disabled = true;
    });

    // Cart Modal
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartIcon.addEventListener('click', () => {
        renderCart();
        cartModal.style.display = 'block';
    });

    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement;
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            cartModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === cartModal) cartModal.style.display = 'none';
    });

    // Checkout (placeholder)
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout not implemented yet. Total: ' + calculateTotal());
    });

    function updateCartCount() {
        document.getElementById('cart-count').textContent = cart.length;
    }

    function renderCart() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <span class="remove-item" data-index="${index}">Remove</span>
            `;
            cartItems.appendChild(itemDiv);
        });
        cartTotal.textContent = `Total: $${calculateTotal().toFixed(2)}`;

        // Remove item
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            });
        });
    }

    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }
});