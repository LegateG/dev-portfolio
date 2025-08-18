// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('#typed-element', {
        strings: ['Data Analyst', 'Business Intelligence Developer', 'Web Developer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        startDelay: 500,
        loop: true
    });
});

// Burger menu functionality
const burgerMenu = document.getElementById('burger-menu');
const mainNav = document.getElementById('main-nav');

burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close menu when clicking on nav links (mobile)
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        burgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
    });
});

// Theme switcher functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme in local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark-mode') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
} else if (savedTheme === 'light-mode') {
    body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light-mode');
    }
});
// Project details functionality
const detailsBtns = document.querySelectorAll('.details-btn');

detailsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const details = document.getElementById(`project-${projectId}-details`);
        
        if (details.classList.contains('show')) {
            details.classList.remove('show');
            this.textContent = 'Show Details';
        } else {
            // Hide all other project details
            document.querySelectorAll('.project-details').forEach(detail => {
                detail.classList.remove('show');
            });
            document.querySelectorAll('.details-btn').forEach(button => {
                button.textContent = 'Show Details';
            });
            
            // Show current project details
            details.classList.add('show');
            this.textContent = 'Hide Details';
        }
    });
});
// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the filter value
        const filter = button.getAttribute('data-filter');
        
        // Remove active class from all buttons and add to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show/hide projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.classList.add('show');
            } else {
                card.classList.add('hidden');
                card.classList.remove('show');
            }
        });
    });
});
// Contact form functionality
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation and feedback
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add success message
        this.appendChild(successDiv);
        
        // Reset form
        this.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.header-controls')) {
            burgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        burgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
    }
});
