// Cart Management Functions 
const CartManager = {
    // Get cart from localStorage
    getCart: function() {
        const cartJSON = localStorage.getItem('oncetechCart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    },

    // Save cart to localStorage
    saveCart: function(cart) {
        localStorage.setItem('oncetechCart', JSON.stringify(cart));
        this.updateCartCount();
    },

    // Add item to cart
    addToCart: function(productId, productName, price, image, quantity = 1) {
        let cart = this.getCart();
        let existingItemIndex = cart.findIndex(item => item.productId == productId);

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                productId,
                name: productName,
                price,
                image,
                quantity
            });
        }

        this.saveCart(cart);
        return cart;
    },

    // Update quantity
    updateQuantity: function(productId, newQuantity) {
        if (newQuantity < 1) newQuantity = 1;
        let cart = this.getCart();
        let itemIndex = cart.findIndex(item => item.productId == productId);

        if (itemIndex >= 0) {
            cart[itemIndex].quantity = newQuantity;
            this.saveCart(cart);
        }
        return cart;
    },

    // Remove item
    removeFromCart: function(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.productId != productId);
        this.saveCart(cart);
        return cart;
    },

    // Clear all
    clearCart: function() {
        localStorage.removeItem('oncetechCart');
        localStorage.removeItem('oncetechPromo'); // Also clear promo
        this.updateCartCount();
    },

    // Cart totals
    getCartTotal: function() {
        let cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getCartItemCount: function() {
        let cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    },

    // Badge updater
    updateCartCount: function() {
        let count = this.getCartItemCount();
        let $cartCountElement = $("#cartCount");
        if ($cartCountElement.length) {
            $cartCountElement.text(count);
        }
        
        // Update any element with id "itemCount"
        let $itemCountElement = $("#itemCount");
        if ($itemCountElement.length) {
            $itemCountElement.text(count + " items");
        }
    },

    // Promotion codes
    getAppliedPromo: function() {
        const promoJSON = localStorage.getItem('oncetechPromo');
        return promoJSON ? JSON.parse(promoJSON) : null;
    },

    applyPromoCode: function(code) {
        const promoCodes = {
            'SCHOOL2025': 0.20,
            'SUMMER15': 0.15,
            'ONCESTECH10': 0.10,
            'ILOVEONCESTECH': 0.05
        };

        if (promoCodes[code]) {
            localStorage.setItem('oncetechPromo', JSON.stringify({
                code: code,
                discount: promoCodes[code]
            }));
            return true;
        }
        return false;
    },

    clearPromoCode: function() {
        localStorage.removeItem('oncetechPromo');
    },

    // Init with jQuery
    init: function() {
        this.updateCartCount();

        // Footer year
        let $yearElement = $("#year");
        if ($yearElement.length) {
            $yearElement.text(new Date().getFullYear());
        }
    }
};

$(document).ready(function() {
    CartManager.init();

    // Make global for inline HTML onclick 
    window.CartManager = CartManager;
    window.addToCart = function(productId, productName, price, image, quantity = 1) {
        return CartManager.addToCart(productId, productName, price, image, quantity);
    };
    window.updateQuantity = function(productId, newQuantity) {
        return CartManager.updateQuantity(productId, newQuantity);
    };
    window.removeFromCart = function(productId) {
        return CartManager.removeFromCart(productId);
    };
    window.clearCart = function() {
        return CartManager.clearCart();
    };
    window.applyPromoCode = function(code) {
        return CartManager.applyPromoCode(code);
    };
});

