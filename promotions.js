// jQuery Ready 
$(document).ready(function () {
    // Initialize cart count
    if (typeof CartManager !== 'undefined') {
        CartManager.updateCartCount(); 
    }

    // Handle "Use Code" buttons
    $(".use-promo-btn").on("click", function () {
        const code = $(this).data("code");
        if (typeof CartManager !== 'undefined' && CartManager.applyPromoCode(code)) { 
            alert(`Promo code "${code}" applied! It will be used at checkout.`);
        } else {
            alert("Invalid promo code.");
        }
    });

    // Handle "Add to Cart" buttons for promotion items
    $(".add-to-cart-btn").on("click", function () {
        const productId = $(this).data("id");
        const productName = $(this).data("name");
        const price = parseFloat($(this).data("price"));
        const image = $(this).data("image");
        
        if (typeof CartManager !== 'undefined') {
            CartManager.addToCart(productId, productName, price, image, 1);
            alert(`${productName} added to cart!`);
            CartManager.updateCartCount();
        } else {
            console.error("CartManager is not defined");
        }
    });

    // Update footer year
    $("#year").text(new Date().getFullYear());
});
