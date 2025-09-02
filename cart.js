$(document).ready(function () {
  const $cartTable = $("#cart-items");
  const $itemCount = $("#itemCount");
  const $subtotal = $("#subtotal");
  const $tax = $("#tax");
  const $shipping = $("#shipping");
  const $discount = $("#discount");
  const $total = $("#total");
  const $clearBtn = $("#clear-cart");
  const $emptyState = $("#empty-state");

  // ---------- LocalStorage Helpers ----------
  const CART_KEY = 'oncetechCart';
  const loadCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const clearCart = () => localStorage.removeItem(CART_KEY);

  let cart = loadCart();
  

  // ---------- Render Cart ----------
  const renderCart = () => {
    $cartTable.empty();
    const appliedPromo = CartManager.getAppliedPromo(); 

    if (cart.length === 0) {
      CartManager.clearPromoCode(); // Clear any promo when no items
      $emptyState.removeClass("d-none");
      $itemCount.text("0 items");
      $subtotal.text("RM 0.00");
      $tax.text("RM 0.00");
      $shipping.text("RM 0.00");
      $discount.text("RM 0.00");
      $total.text("RM 0.00");
      return;
    } else {
      $emptyState.addClass("d-none");
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const qty = item.quantity || 1;
      const itemSubtotal = item.price * qty;
      subtotal += itemSubtotal;

      const $row = $(`
        <tr>
          <td><img src="${item.image || ''}" alt="${item.name || 'Product'}" width="50" class="me-2"> ${item.name || 'Unknown Product'}</td>
          <td class="text-center">RM ${item.price.toFixed(2)}</td>
          <td class="text-center">
            <input type="number" min="1" value="${qty}" 
              class="form-control form-control-sm text-center quantity-input" 
              data-index="${index}">
          </td>
          <td class="text-end">RM ${itemSubtotal.toFixed(2)}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `);
      $cartTable.append($row);
    });

    const tax = subtotal * 0.06; // 6% tax
    const shipping = subtotal > 200 ? 0 : 15;
    let discount = 0;

    // Check promo from localStorage
    if (appliedPromo) {
    discount = subtotal * appliedPromo.discount;
    }


    const total = subtotal + tax + shipping - discount;

    $itemCount.text(`${cart.length} items`);
    $subtotal.text(`RM ${subtotal.toFixed(2)}`);
    $tax.text(`RM ${tax.toFixed(2)}`);
    $shipping.text(`RM ${shipping.toFixed(2)}`);
    $discount.text(`RM ${discount.toFixed(2)}`);
    $total.text(`RM ${total.toFixed(2)}`);

    saveCart(cart);
  };

  // ---------- Quantity Change ----------
  $cartTable.on("input", ".quantity-input", function () {
    const index = $(this).data("index");
    let qty = parseInt($(this).val());
    if (isNaN(qty) || qty < 1) qty = 1;
    $(this).val(qty);
    cart[index].quantity = qty;
    saveCart(cart);
    renderCart();
  });

  // ---------- Remove Item ----------
  $cartTable.on("click", ".remove-btn", function () {
    const index = $(this).data("index");
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  });

  // ---------- Clear Cart ----------
  $clearBtn.on("click", function () {
    cart = [];
    clearCart();
    renderCart();
  });

  // ---------- Apply Promo ----------
  $("#apply-promo").click(function () {
    let code = $("#promo-code").val().trim().toUpperCase();
    if (CartManager.applyPromoCode(code)) {
      alert(`Promo code "${code}" applied!`);
      renderCart();
    } else {
      alert("Invalid promo code.");
    }
  
  });

  // ---------- Checkout ----------
  $("#checkout-btn").click(function () {
    cart = loadCart(); // reload latest
    if (cart.length === 0) {
      alert("Cart is empty!!!");
    } else {
      alert("Proceeding to checkout...");
      // Example: clear after checkout
      window.location.href = "checkout.html";
    }
  });

  // ---------- Refresh cart on window focus ----------
  $(window).on("focus", function () {
    cart = loadCart();
    renderCart();
  });

  // ---------- Initial Render ----------
  renderCart();

  // Footer year
  $("#year").text(new Date().getFullYear());
});
