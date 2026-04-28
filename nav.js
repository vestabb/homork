// ===== NAVIGATION PAGE JAVASCRIPT =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCards();
    initializeScrollEffects();
});

// ===== NAVIGATION FUNCTIONALITY =====

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.topnav a');

    // Add click handlers for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth scroll to section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Update active link
            updateActiveNavLink(this);
        });
    });

    // Highlight current section on scroll
    window.addEventListener('scroll', highlightCurrentSection);
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.topnav a');

    // Remove active class from all links
    navLinks.forEach(link => {
        removeClass(link, 'active');
    });

    // Add active class to clicked link
    addClass(activeLink, 'active');
}

/**
 * Highlight current section based on scroll position
 */
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.topnav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        removeClass(link, 'active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            addClass(link, 'active');
        }
    });
}

// ===== CARD FUNCTIONALITY =====

/**
 * Initialize card interactions
 */
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    // Add hover effects to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            addClass(this, 'card-hover');
        });

        card.addEventListener('mouseleave', function() {
            removeClass(this, 'card-hover');
        });
    });

    // Add click handlers for Read More buttons
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleReadMoreClick(this);
        });
    });
}

/**
 * Handle Read More button clicks
 */
function handleReadMoreClick(button) {
    const card = button.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const description = card.querySelector('.card-description').textContent;

    // Create modal or expand card content
    showCardDetails(title, description);

    // Add visual feedback
    addClass(button, 'btn-clicked');
    setTimeout(() => {
        removeClass(button, 'btn-clicked');
    }, 200);
}

/**
 * Show detailed card information
 */
function showCardDetails(title, description) {
    // Create a simple modal/alert for now
    const details = `
        ${capitalize(title)}

        ${description}

        This feature showcases the latest in technology innovation and digital transformation.
    `;

    // You could replace this with a proper modal
    alert(details);
}

// ===== SCROLL EFFECTS =====

/**
 * Initialize scroll-based effects
 */
function initializeScrollEffects() {
    const cards = document.querySelectorAll('.card');

    // Add scroll animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addClass(entry.target, 'animate-in');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Add scroll progress indicator
    createScrollProgress();
}

/**
 * Create scroll progress indicator
 */
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #007bff, #28a745);
        z-index: 1000;
        transition: width 0.3s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', updateScrollProgress);
}

/**
 * Update scroll progress bar
 */
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const progressBar = getElement('scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    const nav = document.querySelector('.topnav');
    const isOpen = nav.classList.contains('mobile-open');

    if (isOpen) {
        removeClass(nav, 'mobile-open');
    } else {
        addClass(nav, 'mobile-open');
    }
}

/**
 * Search functionality for cards
 */
function searchCards(query) {
    const cards = document.querySelectorAll('.card');
    const searchTerm = query.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            show(card);
        } else {
            hide(card);
        }
    });
}

/**
 * Filter cards by category
 */
function filterCardsByCategory(category) {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardCategory = card.querySelector('.category-tag').textContent.toLowerCase();

        if (category === 'all' || cardCategory === category.toLowerCase()) {
            show(card);
        } else {
            hide(card);
        }
    });
}

// ===== EVENT LISTENERS =====

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals or menus
    if (e.key === 'Escape') {
        // Close any open modals or menus
        logStyled('ESC pressed - closing any open elements', 'color: orange');
    }

    // Space bar to toggle mobile menu (if on mobile)
    if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        // Could toggle mobile menu here
    }
});

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Handle responsive navigation
    const nav = document.querySelector('.topnav');
    if (window.innerWidth > 768) {
        removeClass(nav, 'mobile-open');
    }
});

// ===== INITIALIZATION COMPLETE =====
logStyled('Navigation page JavaScript loaded successfully!', 'color: green; font-weight: bold');