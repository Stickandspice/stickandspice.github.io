// ============================================
// STICK & SPICE - Main JavaScript
// ============================================

// Hero Slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    const pauseBtn = document.getElementById('slidePauseBtn');
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;

    if (slides.length > 0) {
        // Function to show specific slide
        function showSlide(n) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Wrap around if needed
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }

            // Add active class to current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Auto play slideshow
        function startSlideshow() {
            if (!isPaused) {
                slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
            }
        }

        // Stop slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Toggle pause/play
        function togglePause() {
            isPaused = !isPaused;
            
            if (isPaused) {
                stopSlideshow();
                pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                pauseBtn.classList.remove('playing');
                pauseBtn.classList.add('paused');
                pauseBtn.setAttribute('aria-label', 'Play slideshow');
            } else {
                startSlideshow();
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                pauseBtn.classList.remove('paused');
                pauseBtn.classList.add('playing');
                pauseBtn.setAttribute('aria-label', 'Pause slideshow');
            }
        }

        // Event listener for pause button
        if (pauseBtn) {
            pauseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePause();
            });
            pauseBtn.classList.add('playing'); // Initial state
        }

        // Event listeners for arrows
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent click from bubbling to slide link
                nextSlide();
                if (!isPaused) {
                    stopSlideshow();
                    startSlideshow(); // Restart timer
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent click from bubbling to slide link
                prevSlide();
                if (!isPaused) {
                    stopSlideshow();
                    startSlideshow(); // Restart timer
                }
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent click from bubbling to slide link
                showSlide(index);
                if (!isPaused) {
                    stopSlideshow();
                    startSlideshow(); // Restart timer
                }
            });
        });

        // Start the slideshow
        startSlideshow();
    }

    // Mobile Menu Toggle
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling - Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send to your backend or email service
        console.log('Contact form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you within 24-48 hours.');
        contactForm.reset();
    });
}

// Form Handling - Custom Order Form
const customOrderForm = document.getElementById('customOrderForm');
if (customOrderForm) {
    customOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(customOrderForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send to your backend or email service
        console.log('Custom order submitted:', data);
        
        // Show success message
        alert('Thank you for your custom order request! We\'ll send you a design mockup within 24-48 hours.');
        customOrderForm.reset();
    });
}

// Product Filter Functionality (for products page)
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.add('btn-primary');
            this.classList.remove('btn-secondary');
            
            // Get category and filter products
            const category = this.getAttribute('data-category');
            loadProducts(category);
        });
    });
}

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-card, .category-card, .gallery-item').forEach(element => {
    observer.observe(element);
});

// ============================================
// PRODUCT DATA
// ============================================

const products = [
    { id: 1, name: 'Allspice', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Allspice', price: 5.99, description: 'Warm allspice in a handcrafted jar' },
    { id: 2, name: 'Basil', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/basil.jpg', price: 5.99, description: 'Fresh dried basil in a handcrafted jar' },
    { id: 3, name: 'Bay Leaves', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/bayleaves.jpg', price: 5.99, description: 'Premium bay leaves in a handcrafted jar' },
    { id: 4, name: 'Black Sesame', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Black+Sesame', price: 5.99, description: 'Black sesame seeds in a handcrafted jar' },
    { id: 5, name: 'Cajun Seasoning', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Cajun+Seasoning', price: 5.99, description: 'Spicy Cajun seasoning in a handcrafted jar' },
    { id: 6, name: 'Cardamom', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Cardamom', price: 5.99, description: 'Exotic cardamom in a handcrafted jar' },
    { id: 7, name: 'Cayenne Pepper', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/cayennepepper.jpg', price: 5.99, description: 'Spicy cayenne pepper in a handcrafted jar' },
    { id: 8, name: 'Celery Salt', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Celery+Salt', price: 5.99, description: 'Celery salt in a handcrafted jar' },
    { id: 9, name: 'Chinese Five Spice', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Chinese+Five+Spice', price: 5.99, description: 'Chinese five spice blend in a handcrafted jar' },
    { id: 10, name: 'Chives', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Chives', price: 5.99, description: 'Fresh chives in a handcrafted jar' },
    { id: 11, name: 'Cinnamon', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/cinnamon.jpg', price: 5.99, description: 'Sweet cinnamon in a handcrafted jar' },
    { id: 12, name: 'Cloves', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/cloves.jpg', price: 5.99, description: 'Aromatic cloves in a handcrafted jar' },
    { id: 13, name: 'Coriander', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Coriander', price: 5.99, description: 'Fragrant coriander in a handcrafted jar' },
    { id: 14, name: 'Cream of Tartar', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Cream+of+Tartar', price: 5.99, description: 'Cream of tartar in a handcrafted jar' },
    { id: 15, name: 'Crushed Red Pepper', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/crushedredpepper.jpg', price: 5.99, description: 'Spicy crushed red pepper in a handcrafted jar' },
    { id: 16, name: 'Cumin', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/cumin.jpg', price: 5.99, description: 'Earthy cumin in a handcrafted jar' },
    { id: 17, name: 'Curry Powder', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/currypowder.jpg', price: 5.99, description: 'Aromatic curry powder in a handcrafted jar' },
    { id: 18, name: 'Dill Weed', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/dillseasoning.jpg', price: 5.99, description: 'Fresh dill weed in a handcrafted jar' },
    { id: 19, name: 'Fennel', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Fennel', price: 5.99, description: 'Sweet fennel in a handcrafted jar' },
    { id: 20, name: 'Fenugreek', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Fenugreek', price: 5.99, description: 'Aromatic fenugreek in a handcrafted jar' },
    { id: 21, name: 'Garam Masala', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Garam+Masala', price: 5.99, description: 'Authentic garam masala in a handcrafted jar' },
    { id: 22, name: 'Garlic Powder', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/garlicpowderblackbg.jpg', price: 5.99, description: 'Aromatic garlic powder in a handcrafted jar' },
    { id: 23, name: 'Garlic Salt', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/garlicsalt.jpg', price: 5.99, description: 'Savory garlic salt in a handcrafted jar' },
    { id: 24, name: 'Ginger', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/ginger.jpg', price: 5.99, description: 'Spicy ginger in a handcrafted jar' },
    { id: 25, name: 'Ground Mustard', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Ground+Mustard', price: 5.99, description: 'Ground mustard in a handcrafted jar' },
    { id: 26, name: 'Himalayan Pink Salt', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Himalayan+Pink+Salt', price: 5.99, description: 'Premium Himalayan pink salt in a handcrafted jar' },
    { id: 27, name: 'Italian Seasoning', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/italianseasoning.jpg', price: 5.99, description: 'Italian seasoning blend in a handcrafted jar' },
    { id: 28, name: 'Lemon Pepper', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Lemon+Pepper', price: 5.99, description: 'Zesty lemon pepper in a handcrafted jar' },
    { id: 29, name: 'Minced Onion', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/mincedonion.jpg', price: 5.99, description: 'Minced onion in a handcrafted jar' },
    { id: 30, name: 'Mustard Seed', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Mustard+Seed', price: 5.99, description: 'Whole mustard seeds in a handcrafted jar' },
    { id: 31, name: 'Nutmeg', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/nutmeg.jpg', price: 5.99, description: 'Aromatic nutmeg in a handcrafted jar' },
    { id: 32, name: 'Onion Powder', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/onionpowderblackbg.jpg', price: 5.99, description: 'Flavorful onion powder in a handcrafted jar' },
    { id: 33, name: 'Onion Salt', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Onion+Salt', price: 5.99, description: 'Savory onion salt in a handcrafted jar' },
    { id: 34, name: 'Oregano', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/oregano.jpg', price: 5.99, description: 'Fresh oregano in a handcrafted jar' },
    { id: 35, name: 'Paprika', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/paprikaopenbg.jpg', price: 5.99, description: 'Vibrant paprika in a handcrafted jar' },
    { id: 36, name: 'Parsley', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/parsley.jpg', price: 5.99, description: 'Fresh parsley in a handcrafted jar' },
    { id: 37, name: 'Pepper', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/pepperblackbg.jpg', price: 5.99, description: 'Fresh ground pepper in a handcrafted jar' },
    { id: 38, name: 'Popcorn Seasoning', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/main/resized/popcorn.jpg', price: 5.99, description: 'Delicious popcorn seasoning in a handcrafted jar' },
    { id: 39, name: 'Poppy Seeds', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Poppy+Seeds', price: 5.99, description: 'Poppy seeds in a handcrafted jar' },
    { id: 40, name: 'Pumpkin Spice', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Pumpkin+Spice', price: 5.99, description: 'Warm pumpkin spice blend in a handcrafted jar' },
    { id: 41, name: 'Rosemary', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Rosemary', price: 5.99, description: 'Fresh rosemary in a handcrafted jar' },
    { id: 42, name: 'Saffron', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Saffron', price: 5.99, description: 'Premium saffron in a handcrafted jar' },
    { id: 43, name: 'Sage', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/sage.jpg', price: 5.99, description: 'Earthy sage in a handcrafted jar' },
    { id: 44, name: 'Salt', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/saltblackbg.jpg', price: 5.99, description: 'Premium salt in a handcrafted jar' },
    { id: 45, name: 'Season Salt', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/seasonsalt.jpg', price: 5.99, description: 'Seasoned salt blend in a handcrafted jar' },
    { id: 46, name: 'Sesame Seeds', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Sesame+Seeds', price: 5.99, description: 'Toasted sesame seeds in a handcrafted jar' },
    { id: 47, name: 'Smoked Paprika', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Smoked+Paprika', price: 5.99, description: 'Smoky paprika in a handcrafted jar' },
    { id: 48, name: 'Star Anise', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/staranise.jpg', price: 5.99, description: 'Exotic star anise in a handcrafted jar' },
    { id: 49, name: 'Taco Seasoning', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Taco+Seasoning', price: 5.99, description: 'Bold taco seasoning in a handcrafted jar' },
    { id: 50, name: 'Tarragon', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/terragon.jpg', price: 5.99, description: 'Aromatic tarragon in a handcrafted jar' },
    { id: 51, name: 'Thyme', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/thyme.jpg', price: 5.99, description: 'Fresh thyme in a handcrafted jar' },
    { id: 52, name: 'Turmeric', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/tumeric.jpg', price: 5.99, description: 'Golden turmeric in a handcrafted jar' },
    { id: 53, name: 'Vanilla Beans', category: 'jars', image: 'https://via.placeholder.com/800x800/cc567e/ffffff?text=Vanilla+Beans', price: 5.99, description: 'Premium vanilla beans in a handcrafted jar' },
    { id: 54, name: 'White Pepper', category: 'jars', image: 'https://rawcdn.githack.com/Stickandspice/stickandspice.github.io/141d967fb061f336728f7949287c388391e4c5ca/resized/whitepepper.jpg', price: 5.99, description: 'White pepper in a handcrafted jar' }
];

// Function to load products into the grid
function loadProducts(filterCategory = 'all') {
    const productGrid = document.getElementById('productGrid');
    const bundleGrid = document.getElementById('bundleGrid');
    
    if (!productGrid) return;
    
    // Separate jars and bundles
    const jars = products.filter(p => p.category === 'jars');
    const bundles = products.filter(p => p.category === 'bundles');
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Create SINGLE product card with dropdown for spice selection
    const productCard = document.createElement('div');
    productCard.className = 'product-card fade-in-up spice-selector-card';
    productCard.style.maxWidth = '600px';
    productCard.style.margin = '0 auto';
    
    // Build dropdown options from all spices
    const spiceOptions = jars.map((product, index) => 
        `<option value="${product.id}" data-image="${product.image}" data-description="${product.description}">${product.name}</option>`
    ).join('');
    
    productCard.innerHTML = `
        <img src="${jars[0].image}" alt="Spice Jar" class="product-image" id="spiceJarImage">
        <div class="product-info">
            <h3 class="product-title" style="font-size: 1.8rem;">Handcrafted Spice Jar</h3>
            <p class="product-description" id="spiceDescription" style="min-height: 60px; margin-bottom: 1rem;">${jars[0].description}</p>
            
            <!-- Spice Selection Dropdown -->
            <div style="margin: 1.5rem 0;">
                <label for="spiceSelect" style="display: block; font-weight: 600; color: #2d3436; margin-bottom: 0.75rem; font-size: 1.05rem;">
                    <i class="fas fa-pepper-hot" style="color: #cc567e; margin-right: 0.5rem;"></i>
                    Choose Your Spice:
                </label>
                <select id="spiceSelect" class="spice-dropdown" style="width: 100%; padding: 1rem; border: 2px solid #cc567e; border-radius: 10px; font-size: 1rem; background: white; color: #2d3436; cursor: pointer; transition: all 0.3s ease; font-weight: 500;">
                    ${spiceOptions}
                </select>
            </div>
            
            <p class="product-price" style="font-size: 1.8rem; margin: 1.5rem 0;">$5.99</p>
            <button class="add-to-cart-btn" id="addSpiceToCart" style="width: 100%; padding: 1.2rem; font-size: 1.1rem; font-weight: 600;">
                <i class="fas fa-shopping-cart" style="margin-right: 0.5rem;"></i>Add to Cart
            </button>
            
            <div style="margin-top: 1.5rem; padding: 1rem; background: linear-gradient(135deg, #fff5f7, #ffe8f0); border-radius: 10px; border-left: 4px solid #cc567e;">
                <p style="margin: 0; font-size: 0.9rem; color: #636e72; line-height: 1.6;">
                    <i class="fas fa-info-circle" style="color: #cc567e; margin-right: 0.5rem;"></i>
                    <strong>54 Spices Available!</strong> Select your favorite from the dropdown above. Each jar is handcrafted with premium spices.
                </p>
            </div>
        </div>
    `;
    
    productGrid.appendChild(productCard);
    
    // Add event listener to dropdown for image/description updates
    const spiceSelect = document.getElementById('spiceSelect');
    const spiceImage = document.getElementById('spiceJarImage');
    const spiceDescription = document.getElementById('spiceDescription');
    
    spiceSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const newImage = selectedOption.getAttribute('data-image');
        const newDescription = selectedOption.getAttribute('data-description');
        
        // Update image with fade effect
        spiceImage.style.opacity = '0.3';
        setTimeout(() => {
            spiceImage.src = newImage;
            spiceImage.style.opacity = '1';
        }, 200);
        
        // Update description
        spiceDescription.textContent = newDescription;
    });
    
    // Add to cart functionality
    document.getElementById('addSpiceToCart').addEventListener('click', function() {
        const selectedOption = spiceSelect.options[spiceSelect.selectedIndex];
        const selectedSpice = jars.find(p => p.id == spiceSelect.value);
        
        if (selectedSpice) {
            // Add selected spice to cart
            addToCart(selectedSpice.id, selectedSpice.name, selectedSpice.price, selectedSpice.image);
        }
    });
    
    // If there's a bundle grid, populate it
    if (bundleGrid) {
        bundleGrid.innerHTML = '';
        if (bundles.length > 0) {
            bundles.forEach(product => {
                const bundleCard = document.createElement('div');
                bundleCard.className = 'product-card fade-in-up';
                bundleCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">Add to Cart</button>
                    </div>
                `;
                bundleGrid.appendChild(bundleCard);
            });
            
            // Attach listeners for bundle cards
            attachAddToCartListeners();
        } else {
            // Hide bundle section if no bundles
            const bundlesSection = document.getElementById('bundlesSection');
            if (bundlesSection) bundlesSection.style.display = 'none';
        }
    }
}

// Attach add to cart listeners
function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;
            const productImage = this.dataset.productImage;
            
            // Add to cart
            addToCart(productId, productName, productPrice, productImage);
        });
    });
}

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================

let cart = [];
const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 8.99;

// Load cart from localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('stickAndSpiceCart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            
            // Validate and sanitize cart data
            cart = parsedCart.filter(item => {
                // Ensure item has required properties and valid values
                if (!item.id || !item.name || typeof item.price !== 'number' || isNaN(item.price)) {
                    console.warn('Removing invalid cart item:', item);
                    return false;
                }
                
                // Fix any invalid quantities
                if (!item.quantity || item.quantity < 1) {
                    item.quantity = 1;
                }
                
                // Ensure price is a valid number
                item.price = parseFloat(item.price);
                if (isNaN(item.price)) {
                    return false;
                }
                
                return true;
            });
            
            // Save cleaned cart back to localStorage
            saveCart();
            updateCartCount();
        }
    } catch (error) {
        console.error('Error loading cart, resetting:', error);
        // Clear corrupted cart data
        cart = [];
        localStorage.removeItem('stickAndSpiceCart');
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('stickAndSpiceCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Add item to cart
function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            image: productImage || 'https://via.placeholder.com/100',
            quantity: 1
        });
    }
    
    saveCart();
    showAddToCartAnimation();
    openCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Calculate cart totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Get random products for suggestions (not in cart)
function getRandomSuggestions(count = 4) {
    const cartProductIds = cart.map(item => item.id);
    const availableProducts = products.filter(p => !cartProductIds.includes(p.id.toString()));
    
    // Shuffle and pick random products
    const shuffled = availableProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Render cart items
function renderCart() {
    try {
        const cartItemsContainer = document.getElementById('cartItems');
        
        // Filter out any invalid items before rendering
        cart = cart.filter(item => {
            if (!item || !item.id || !item.name || typeof item.price !== 'number' || isNaN(item.price)) {
                console.warn('Removing invalid item from cart:', item);
                return false;
            }
            return true;
        });
        
        // Save cleaned cart
        if (cart.length > 0) {
            saveCart();
        }
        
        const { subtotal, shipping, total } = calculateTotals();
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: #636e72;">
                    <i class="fas fa-shopping-cart" style="font-size: 4rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Your cart is empty</p>
                    <p style="font-size: 0.9rem;">Add some beautiful spices to get started!</p>
                </div>
            `;
            document.getElementById('suggestedProducts').style.display = 'none';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => {
                // Extra validation per item
                const itemPrice = parseFloat(item.price) || 0;
                const itemQuantity = parseInt(item.quantity) || 1;
                const itemName = item.name || 'Unknown Product';
                const itemImage = item.image || 'https://via.placeholder.com/100';
                
                return `
            <div style="display: flex; gap: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 10px; margin-bottom: 1rem; align-items: center;">
                <img src="${itemImage}" alt="${itemName}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.25rem 0; color: #2d3436; font-size: 1rem;">${itemName}</h4>
                    <p style="margin: 0; color: #cc567e; font-weight: 600;">$${itemPrice.toFixed(2)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="updateQuantity('${item.id}', -1)" style="background: white; border: 2px solid #e0e0e0; width: 30px; height: 30px; border-radius: 5px; cursor: pointer; font-weight: bold; color: #636e72; transition: all 0.3s ease;" onmouseover="this.style.borderColor='#cc567e'; this.style.color='#cc567e'" onmouseout="this.style.borderColor='#e0e0e0'; this.style.color='#636e72'">
                        <i class="fas fa-minus" style="font-size: 0.75rem;"></i>
                    </button>
                    <span style="min-width: 30px; text-align: center; font-weight: 600; color: #2d3436;">${itemQuantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)" style="background: white; border: 2px solid #e0e0e0; width: 30px; height: 30px; border-radius: 5px; cursor: pointer; font-weight: bold; color: #636e72; transition: all 0.3s ease;" onmouseover="this.style.borderColor='#cc567e'; this.style.color='#cc567e'" onmouseout="this.style.borderColor='#e0e0e0'; this.style.color='#636e72'">
                        <i class="fas fa-plus" style="font-size: 0.75rem;"></i>
                    </button>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background: #fee; border: none; color: #e74c3c; width: 35px; height: 35px; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#e74c3c'; this.style.color='white'" onmouseout="this.style.background='#fee'; this.style.color='#e74c3c'">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
            }).join('');
        
        // Show suggested products if under free shipping threshold
        if (subtotal < FREE_SHIPPING_THRESHOLD) {
            const suggestions = getRandomSuggestions(4);
            document.getElementById('suggestedProducts').style.display = 'block';
            document.getElementById('suggestedProductsGrid').innerHTML = suggestions.map(product => `
                <div style="background: linear-gradient(135deg, #fff5f7 0%, #ffffff 100%); border: 2px solid #ffe8f0; border-radius: 10px; padding: 1.25rem; transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between;" onmouseover="this.style.borderColor='#cc567e'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 4px 12px rgba(204, 86, 126, 0.15)'" onmouseout="this.style.borderColor='#ffe8f0'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <div>
                        <h5 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: #2d3436; font-weight: 600; line-height: 1.3;">${product.name}</h5>
                        <p style="margin: 0 0 1rem 0; color: #cc567e; font-weight: 700; font-size: 1.1rem; font-family: 'Playfair Display', serif;">$${product.price.toFixed(2)}</p>
                    </div>
                    <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')" style="background: linear-gradient(135deg, #cc567e, #d4879c); color: white; border: none; padding: 0.65rem 1rem; border-radius: 8px; font-size: 0.9rem; cursor: pointer; width: 100%; font-weight: 600; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(204, 86, 126, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        <i class="fas fa-plus" style="margin-right: 0.5rem;"></i>Add to Cart
                    </button>
                </div>
            `).join('');
        } else {
            document.getElementById('suggestedProducts').style.display = 'none';
        }
        }
        
        // Update totals
        document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
        
        // Update free shipping progress
        const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
        document.getElementById('freeShippingProgress').style.width = `${progress}%`;
        
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        if (remaining > 0) {
            document.getElementById('freeShippingText').innerHTML = `<i class="fas fa-truck" style="margin-right: 0.5rem;"></i>Add $${remaining.toFixed(2)} more for FREE shipping!`;
        } else {
            document.getElementById('freeShippingText').innerHTML = `<i class="fas fa-check-circle" style="margin-right: 0.5rem; color: #27ae60;"></i>You qualify for FREE shipping! 🎉`;
        }
    } catch (error) {
        console.error('Error rendering cart:', error);
        const cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: #e74c3c;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Error loading cart</p>
                    <p style="font-size: 0.9rem;">Please refresh the page or clear your cart.</p>
                    <button onclick="localStorage.removeItem('stickAndSpiceCart'); location.reload();" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Clear Cart & Refresh</button>
                </div>
            `;
        }
    }
}

// Open cart modal
function openCart() {
    renderCart();
    document.getElementById('cartModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show add to cart animation
function showAddToCartAnimation() {
    // Simple notification (you can enhance this)
    const notification = document.createElement('div');
    notification.innerHTML = '<i class="fas fa-check-circle"></i> Added to cart!';
    notification.style.cssText = 'position: fixed; top: 100px; right: 20px; background: #27ae60; color: white; padding: 1rem 1.5rem; border-radius: 10px; z-index: 10001; animation: slideIn 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-weight: 600;';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Proceed to checkout (placeholder)
function proceedToCheckout() {
    alert('Stripe Checkout integration coming soon! Your cart total is: ' + document.getElementById('cartTotal').textContent);
    // TODO: Integrate with Stripe
}

// Update attachAddToCartListeners to include product image
function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;
            
            // Try to find product image
            const productCard = this.closest('.product-card');
            const productImage = productCard ? productCard.querySelector('.product-image')?.src || productCard.querySelector('img')?.src : null;
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
}

// Close cart when clicking outside
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        closeCart();
    }
});

// Load cart on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// STRIPE PAYMENT INTEGRATION
// ============================================

// Initialize Stripe Checkout
// NOTE: Replace 'your-stripe-publishable-key' with your actual Stripe key

/*
Example Stripe Checkout Integration:
After setting up your Stripe account, you'll add code like this:

// Load Stripe.js
const stripe = Stripe('your-stripe-publishable-key'); // Replace with your actual key

// Function to redirect to Stripe Checkout
function redirectToStripeCheckout(productId, productName, productPrice) {
    // Create checkout session on your server, then redirect
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            productName: productName,
            productPrice: productPrice,
        }),
    })
    .then(response => response.json())
    .then(session => {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Payment system error. Please try again.');
    });
}
*/

// Newsletter Subscription Forms
document.querySelectorAll('form').forEach(form => {
    // Skip forms that already have handlers
    if (form.id === 'contactForm' || form.id === 'customOrderForm') {
        return;
    }
    
    form.addEventListener('submit', function(e) {
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && !form.id) {
            e.preventDefault();
            const email = emailInput.value;
            
            // Here you would typically integrate with your email marketing service
            // (Mailchimp, Klaviyo, etc.)
            console.log('Newsletter subscription:', email);
            
            alert('Thanks for subscribing! You\'ll receive our latest updates and exclusive offers.');
            emailInput.value = '';
        }
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Gallery Lightbox (Simple Implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        }
    });
});

// Add to cart animation (visual feedback)
function addToCartAnimation(button) {
    const originalText = button.textContent;
    button.textContent = 'Added! ✓';
    button.style.background = '#4caf50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Console welcome message
console.log('%cWelcome to Stick & Spice! 🎨', 'color: #d4a574; font-size: 24px; font-weight: bold;');
console.log('%cHandcrafted with love ❤️', 'color: #8b6f47; font-size: 16px;');
