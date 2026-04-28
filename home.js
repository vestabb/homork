// ===== HOME PAGE JAVASCRIPT =====

// Product Database
const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'iphone',
        price: 999,
        rating: 4.8,
        emoji: '📱',
        description: 'Latest iPhone with A17 Pro chip',
        specs: ['6.1" Super Retina display', 'A17 Pro chip', 'Pro camera system', 'USB-C', 'Titanium design'],
        inStock: true
    },
    {
        id: 2,
        name: 'iPhone 15',
        category: 'iphone',
        price: 799,
        rating: 4.7,
        emoji: '📱',
        description: 'Powerful iPhone with standard features',
        specs: ['6.1" display', 'A16 Bionic chip', 'Dual camera', 'USB-C', 'All-day battery'],
        inStock: true
    },
    {
        id: 3,
        name: 'iPad Pro 12.9"',
        category: 'ipad',
        price: 1199,
        rating: 4.9,
        emoji: '📱',
        description: 'Ultra-powerful iPad with M2 chip',
        specs: ['12.9" Liquid Retina XDR', 'M2 chip', 'ProMotion 120Hz', 'Thunderbolt', 'Wi-Fi 6E'],
        inStock: true
    },
    {
        id: 4,
        name: 'iPad Air',
        category: 'ipad',
        price: 599,
        rating: 4.6,
        emoji: '📱',
        description: 'Versatile iPad for everyday use',
        specs: ['10.9" Liquid Retina', 'M1 chip', '12MP cameras', 'Touch ID', 'Smart Connector'],
        inStock: true
    },
    {
        id: 5,
        name: 'Apple Watch Series 9',
        category: 'watch',
        price: 399,
        rating: 4.7,
        emoji: '⌚',
        description: 'Advanced health & fitness tracker',
        specs: ['Always-On Retina display', 'Fitness tracking', 'ECG app', 'Blood oxygen', '2-day battery'],
        inStock: true
    },
    {
        id: 6,
        name: 'Apple Watch Ultra',
        category: 'watch',
        price: 799,
        rating: 4.9,
        emoji: '⌚',
        description: 'Rugged smartwatch for adventurers',
        specs: ['49mm Retina display', 'Titanium', 'Action button', 'Dive computer', '36-hour battery'],
        inStock: false
    },
    {
        id: 7,
        name: 'AirPods Pro',
        category: 'airpods',
        price: 249,
        rating: 4.8,
        emoji: '🎧',
        description: 'Premium wireless earbuds',
        specs: ['Active Noise Cancellation', 'Transparency mode', 'Spatial audio', '6-hour battery', 'MagSafe'],
        inStock: true
    },
    {
        id: 8,
        name: 'AirPods Max',
        category: 'airpods',
        price: 549,
        rating: 4.9,
        emoji: '🎧',
        description: 'Spatial audio headphones',
        specs: ['Computational audio', '40-hour battery', 'Immersive sound', 'Touch controls', 'Premium design'],
        inStock: true
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeHome();
});

/**
 * Initialize home page functionality
 */
function initializeHome() {
    displayProducts(products);
    initializeFilters();
    initializeModal();
    initializeContactForm();
    logStyled('Home page initialized', 'color: green');
}

// ===== PRODUCT DISPLAY =====

/**
 * Display products on the page
 */
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

/**
 * Create a product card element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
            <span class="product-category">${capitalize(product.category)}</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price}</span>
                <span class="product-rating">${product.rating} ⭐</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    return card;
}

// ===== FILTERING =====

/**
 * Initialize filter buttons
 */
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => removeClass(btn, 'active'));
            addClass(this, 'active');

            // Filter products
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

/**
 * Filter products by category
 */
function filterProducts(filter) {
    let filtered = products;

    if (filter !== 'all') {
        filtered = products.filter(p => p.category === filter);
    }

    displayProducts(filtered);
    logStyled(`Filtered by: ${filter}`, 'color: blue');
}

// ===== MODAL =====

/**
 * Initialize modal functionality
 */
function initializeModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModal');

    closeBtn.addEventListener('click', closeProductModal);

    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });
}

/**
 * Open product modal
 */
function openProductModal(product) {
    const modal = document.getElementById('productModal');

    // Set modal content
    document.getElementById('modalImage').textContent = product.emoji;
    setText('modalTitle', product.name);
    setText('modalCategory', capitalize(product.category));
    setText('modalDescription', product.description);
    setText('modalPrice', `$${product.price}`);
    setText('modalRating', `${product.rating} ⭐ (124 reviews)`);

    // Set specifications
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        setText(li, spec);
        specsList.appendChild(li);
    });

    // Set availability
    const availability = document.getElementById('availabilityStatus');
    if (product.inStock) {
        availability.className = 'availability in-stock';
        setText(availability, '✓ In Stock - Ready to Ship');
    } else {
        availability.className = 'availability out-of-stock';
        setText(availability, '✗ Out of Stock - Coming Soon');
    }

    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.disabled = !product.inStock;
    addToCartBtn.textContent = product.inStock ? 'Add to Cart' : 'Notify Me';

    addToCartBtn.onclick = () => handleAddToCart(product);

    // Favorite button
    document.getElementById('favoriteBtn').onclick = () => handleFavorite(product);

    // Show modal
    addClass(modal, 'show');
    document.body.style.overflow = 'hidden';

    logStyled(`Opened modal for: ${product.name}`, 'color: blue');
}

/**
 * Close product modal
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    removeClass(modal, 'show');
    document.body.style.overflow = 'auto';
}

/**
 * Handle add to cart
 */
function handleAddToCart(product) {
    // Save to local storage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show confirmation
    showMessage(`${product.name} added to cart!`, 'success');
    closeProductModal();

    logStyled(`${product.name} added to cart`, 'color: green');
}

/**
 * Handle favorite toggle
 */
function handleFavorite(product) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const isFavorite = favorites.find(fav => fav.id === product.id);

    if (isFavorite) {
        favorites = favorites.filter(fav => fav.id !== product.id);
    } else {
        favorites.push(product);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update button
    const btn = document.getElementById('favoriteBtn');
    btn.textContent = isFavorite ? '❤️ Favorite' : '🤍 Add to Favorites';

    logStyled(`Favorite toggled for: ${product.name}`, 'color: blue');
}

/**
 * Show notification message
 */
function showMessage(message, type = 'info') {
    const div = document.createElement('div');
    div.className = `message-notification ${type}`;
    div.textContent = message;
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// ===== CONTACT FORM =====

/**
 * Initialize contact form
 */
function initializeContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Validate
        if (isEmpty(name) || isEmpty(email) || isEmpty(message)) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email', 'error');
            return;
        }

        // Simulate sending
        showMessage('Message sent! We\'ll get back to you soon.', 'success');
        form.reset();

        logStyled(`Contact message from: ${name} (${email})`, 'color: green');
    });
}

// ===== CTA BUTTON =====

document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// ===== KEYBOARD NAVIGATION =====

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// ===== INITIALIZATION COMPLETE =====
logStyled('Home page JavaScript loaded successfully!', 'color: green; font-weight: bold');
