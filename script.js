// script.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    startStockPriceAnimations();
});

// Initialize Website Function
function initializeWebsite() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize animations
    initScrollAnimations();
    
    // Check if user has visited before
    if (!localStorage.getItem('firstVisit')) {
        showWelcomeMessage();
        localStorage.setItem('firstVisit', 'true');
    }
    
    // Initialize tooltips
    initTooltips();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Connect wallet button
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', handleWalletConnection);
    }
    
    // Language selector
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', changeLanguage);
    }
    
    // Contact form submissions
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Service boxes click events
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            const serviceDesc = this.getAttribute('data-description');
            showServiceDetails(serviceName, serviceDesc);
        });
    });
    
    // Stock items click events
    const stockItems = document.querySelectorAll('.stock-item');
    stockItems.forEach(item => {
        item.addEventListener('click', function() {
            const stockName = this.getAttribute('data-stock');
            const stockAnalysis = this.getAttribute('data-analysis');
            showStockAnalysis(stockName, stockAnalysis);
        });
    });
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Scroll events for header
    window.addEventListener('scroll', handleScroll);
}

// Handle Scroll Function
function handleScroll() {
    const header = document.querySelector('.header-premium');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animate elements on scroll
    animateOnScroll();
}

// Initialize Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animate Elements on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-box, .offer-card, .stock-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}

// Handle Wallet Connection
function handleWalletConnection() {
    const walletBtn = document.getElementById('connect-wallet-btn');
    
    // Simulate wallet connection
    walletBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    walletBtn.disabled = true;
    
    setTimeout(() => {
        walletBtn.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
        walletBtn.classList.add('connected');
        
        // Show success notification
        showNotification('Wallet connected successfully!', 'success');
        
        // Enable trading features (simulated)
        enableTradingFeatures();
    }, 2000);
}

// Enable Trading Features
function enableTradingFeatures() {
    // Simulate enabling premium features
    const premiumFeatures = document.querySelectorAll('.premium-feature');
    premiumFeatures.forEach(feature => {
        feature.classList.remove('disabled');
    });
    
    // Show premium dashboard section
    const dashboardSection = document.getElementById('premium-dashboard');
    if (dashboardSection) {
        dashboardSection.classList.add('active');
    }
}

// Change Language Function
function changeLanguage() {
    const langSelect = document.getElementById('langSelect');
    const selectedLang = langSelect.value;
    
    // Show loading state
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        if (selectedLang === 'hi') {
            // Hindi content
            document.getElementById('bio').innerHTML = `
                <p>स्वागत है <b>Piyush Capital Ventures</b> में। मैं <b>Piyush Dubey</b>, एक उत्साही निवेशक, 
                जो शोध और ट्रेंड्स के आधार पर बेहतरीन स्टॉक अनुशंसाएँ देता हूँ। 
                <br><b>डिसक्लेमर:</b> मैं SEBI रजिस्टर्ड नहीं हूँ लेकिन गहन जानकारी और मार्गदर्शन प्रदान करता हूँ।</p>`;
        } else {
            // English content
            document.getElementById('bio').innerHTML = `
                <p>Welcome to <b>Piyush Capital Ventures</b>, your world-class partner in smart investing. 
                I am <b>Piyush Dubey</b>, a passionate investor providing top stock recommendations backed by research and trends. 
                <br><b>Disclaimer:</b> I am not SEBI registered but provide detailed insights and guidance to empower your financial journey.</p>`;
        }
        
        document.body.style.opacity = '1';
        showNotification(`Language changed to ${selectedLang === 'hi' ? 'Hindi' : 'English'}`, 'success');
    }, 500);
}

// Handle Form Submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formId = form.getAttribute('id');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
        submitBtn.classList.add('success');
        
        // Show success message
        if (formId === 'question-form') {
            showNotification('Your question has been submitted successfully! We will contact you soon.', 'success');
        } else if (formId === 'course-form') {
            showNotification('Course enrollment successful! Check your email for details.', 'success');
        }
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('success');
        }, 3000);
    }, 2000);
}

// Show Service Details
function showServiceDetails(serviceName, serviceDesc) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('service-modal-title');
    const description = document.getElementById('service-modal-desc');
    
    title.textContent = serviceName;
    description.textContent = serviceDesc;
    
    modal.style.display = 'flex';
}

// Show Stock Analysis
function showStockAnalysis(stockName, stockAnalysis) {
    const modal = document.getElementById('stock-modal');
    const title = document.getElementById('stock-modal-title');
    const analysis = document.getElementById('stock-modal-analysis');
    
    title.textContent = `${stockName} Analysis`;
    analysis.textContent = stockAnalysis;
    
    modal.style.display = 'flex';
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button event
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Initialize Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Show Tooltip
function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    // Position tooltip
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    
    // Store reference
    this.tooltip = tooltip;
}

// Hide Tooltip
function hideTooltip() {
    if (this.tooltip) {
        this.tooltip.remove();
        this.tooltip = null;
    }
}

// Start Stock Price Animations
function startStockPriceAnimations() {
    const stockPrices = document.querySelectorAll('.stock-price');
    
    // Simulate live price changes
    setInterval(() => {
        stockPrices.forEach(priceElement => {
            // Random slight price change
            const change = (Math.random() - 0.5) * 2;
            const currentPrice = parseFloat(priceElement.getAttribute('data-price'));
            const newPrice = currentPrice + change;
            
            // Update price and color
            priceElement.textContent = `₹${newPrice.toFixed(2)}`;
            priceElement.setAttribute('data-price', newPrice);
            
            if (change > 0) {
                priceElement.classList.add('up');
                priceElement.classList.remove('down');
            } else if (change < 0) {
                priceElement.classList.add('down');
                priceElement.classList.remove('up');
            }
        });
    }, 5000);
}

// Show Welcome Message
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('Welcome to Piyush Capital Ventures! Start your investment journey with us.', 'success');
    }, 1000);
}

// Export functions for global access (if needed)
window.PCV = {
    changeLanguage,
    showServiceDetails,
    showStockAnalysis,
    showNotification
};
<script>
    // Testimonial carousel functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        testimonials[index].style.display = 'block';
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Initialize
    showTestimonial(0);
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
</script>

// Performance monitoring
if ('performance' in window) {
    // Measure page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime} milliseconds`);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-premium");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});
