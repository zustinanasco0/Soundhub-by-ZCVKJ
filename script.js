document.addEventListener('DOMContentLoaded', () => {
  // ====== GLOBAL VARIABLES ======
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const loggedInUser = localStorage.getItem('loggedInUser');

  // ====== CART HELPERS ======
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
  }

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // ====== TOAST NOTIFICATION ======
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
      toast.className = toast.className.replace('show', '');
    }, 2500);
  }

  // ====== RENDER CART PAGE ======
  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <span>${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
        <span class="remove-item" data-index="${index}">🗑️</span>
      `;
      cartItems.appendChild(div);
    });

    cartTotal.textContent = `Total: $${calculateTotal().toFixed(2)}`;

    // Remove item logic
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updateCartCount();
      });
    });
  }

  // ====== ADD-TO-CART BUTTONS (with quantity) ======
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.closest('.product');
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
      const quantity = parseInt(product.querySelector('.quantity')?.textContent || 1);

      // Check if already in cart
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += quantity; // accumulate quantity
        showToast(`Updated quantity: ${existingItem.quantity} × ${name}`);
      } else {
        cart.push({ name, price, quantity });
        showToast(`${quantity} × ${name} added to cart!`);
      }

      saveCart();
      updateCartCount();
    });
  });

  // ====== QUANTITY BUTTONS ======
  const quantityControls = document.querySelectorAll('.quantity-controls');
  quantityControls.forEach(control => {
    const decreaseBtn = control.querySelector('.decrease');
    const increaseBtn = control.querySelector('.increase');
    const quantityDisplay = control.querySelector('.quantity');

    decreaseBtn.addEventListener('click', () => {
      let current = parseInt(quantityDisplay.textContent);
      if (current > 1) quantityDisplay.textContent = current - 1;
    });

    increaseBtn.addEventListener('click', () => {
      let current = parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = current + 1;
    });
  });

  // ====== LOGIN PAGE ======
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      localStorage.setItem('loggedInUser', username);
      const loginStatus = document.getElementById('login-status');
      loginStatus.textContent = `Logged in as ${username}`;
      setTimeout(() => (window.location.href = 'index.html'), 1000);
    });
  }

  // ====== CART PAGE ======
  if (document.getElementById('cart-items')) {
    renderCart();
    updateCartCount();

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
    }
  }

  // ====== CHECKOUT PAGE ======
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Payment successful! Thank you for shopping with ZCVKJ Soundhub.');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  }

  // ====== FEEDBACK PAGE ======
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('feedback-status').textContent =
        'Thank you for your feedback!';
      feedbackForm.reset();
    });
  }

  // ====== SHOW LOGIN USER IN NAVBAR ======
  const loginLink = document.querySelector('a[href="login.html"]');
  if (loggedInUser && loginLink) {
    loginLink.textContent = `Hi, ${loggedInUser}`;
    loginLink.style.fontWeight = 'bold';
  }

  updateCartCount();
});
