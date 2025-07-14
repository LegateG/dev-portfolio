// Wait for DOM to be fully loaded before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Select all detail buttons and project details
    const detailButtons = document.querySelectorAll('.details-btn');
    const projectDetails = document.querySelectorAll('.project-details');
    
    // Add click event listener to each button
    detailButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the project ID from the button's data attribute
            const projectId = this.getAttribute('data-project');
            const detailsElement = document.getElementById('project-' + projectId + '-details');
            
            // Toggle the visibility of the project details
            if (detailsElement.classList.contains('show')) {
                // Hide details
                detailsElement.classList.remove('show');
                this.textContent = 'Show Details';
            } else {
                // Show details
                detailsElement.classList.add('show');
                this.textContent = 'Hide Details';
            }
        });
    });
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active navigation state based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        let currentSection = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events to update active navigation
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initial call to set the active navigation on page load
    updateActiveNavigation();
    
    console.log('Portfolio JavaScript loaded successfully!');
});