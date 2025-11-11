// ====== TOAST FUNCTION ======
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 2500);
}

// ====== ADD-TO-CART BUTTONS ======
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const quantity = parseInt(product.querySelector('.quantity').textContent);

    // check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    saveCart();
    updateCartCount();
    showToast(`${quantity} × ${name} added to cart!`);
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
