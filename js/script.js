// Variables para el carrito obtenidas desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((count, product) => count + product.quantity, 0);


function loadCartFromLocalStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    updateCartCount(); // Actualiza el contador al cargar la página
}

// Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el contador del carrito en el navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        if (cartCount === 0) {
            cartCountElement.style.display = 'none';
        } else {
            cartCountElement.style.display = 'inline-block';
        }
    } else {
        console.error('Elemento #cart-count no encontrado en el DOM.');
    }
}

// Función para agregar al carrito y actualizar la cantidad si el producto ya existe
function addToCart(newProduct) {
    let productExists = false;
    cart = cart.map(product => {
        if (product.name === newProduct.name) {
            productExists = true;
            return { ...product, quantity: product.quantity + 1 };
        }
        return product;
    });

    if (!productExists) {
        cart.push({ ...newProduct, quantity: 1 });
    }

    cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    updateCartCount();
    saveCartToLocalStorage();
}

// Llama a loadCartFromLocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();

    // Evento click para botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            const product = {
                name: card.querySelector('.card-title').textContent,
                description: card.querySelector('.card-text').textContent,
                image: card.querySelector('.card-img-top').src,
                price: parseFloat(card.querySelector('.card-text.text-primary').textContent.replace('S/ ', '')),
                quantity: 1 // Inicialmente se agrega 1 producto
            };
            addToCart(product);
        });
    });
});
