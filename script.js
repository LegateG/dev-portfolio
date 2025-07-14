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
    
    // CONTACT FORM VALIDATION
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        // Validation functions
        function validateName(name) {
            const trimmedName = name.trim();
            return trimmedName.length >= 2;
        }
        
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        }
        
        function validateMessage(message) {
            const trimmedMessage = message.trim();
            return trimmedMessage.length >= 10;
        }
        
        // Function to show error message
        function showError(field, message) {
            // Remove any existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Create and add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '5px';
            
            field.parentNode.appendChild(errorDiv);
            field.style.borderColor = '#dc3545';
        }
        
        // Function to clear error message
        function clearError(field) {
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            field.style.borderColor = '';
        }
        
        // Function to show success message
        function showSuccess() {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.textContent = 'Thank you for your message! I will get back to you soon.';
            successDiv.style.color = '#28a745';
            successDiv.style.fontSize = '1rem';
            successDiv.style.fontWeight = 'bold';
            successDiv.style.marginTop = '15px';
            successDiv.style.padding = '10px';
            successDiv.style.backgroundColor = '#d4edda';
            successDiv.style.border = '1px solid #c3e6cb';
            successDiv.style.borderRadius = '5px';
            
            contactForm.appendChild(successDiv);
            
            // Remove success message after 5 seconds
            setTimeout(function() {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 5000);
        }
        
        // Real-time validation on input
        nameField.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                if (validateName(this.value)) {
                    clearError(this);
                } else {
                    showError(this, 'Name must be at least 2 characters long');
                }
            } else {
                clearError(this);
            }
        });
        
        emailField.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                if (validateEmail(this.value)) {
                    clearError(this);
                } else {
                    showError(this, 'Please enter a valid email address');
                }
            } else {
                clearError(this);
            }
        });
        
        messageField.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                if (validateMessage(this.value)) {
                    clearError(this);
                } else {
                    showError(this, 'Message must be at least 10 characters long');
                }
            } else {
                clearError(this);
            }
        });
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Clear any existing success messages
            const existingSuccess = contactForm.querySelector('.success-message');
            if (existingSuccess) {
                existingSuccess.remove();
            }
            
            // Get field values
            const name = nameField.value;
            const email = emailField.value;
            const message = messageField.value;
            
            // Validation flags
            let isValid = true;
            
            // Validate name
            if (!name.trim()) {
                showError(nameField, 'Name is required');
                isValid = false;
            } else if (!validateName(name)) {
                showError(nameField, 'Name must be at least 2 characters long');
                isValid = false;
            } else {
                clearError(nameField);
            }
            
            // Validate email
            if (!email.trim()) {
                showError(emailField, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailField, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailField);
            }
            
            // Validate message
            if (!message.trim()) {
                showError(messageField, 'Message is required');
                isValid = false;
            } else if (!validateMessage(message)) {
                showError(messageField, 'Message must be at least 10 characters long');
                isValid = false;
            } else {
                clearError(messageField);
            }
            
            // If all validations pass
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message and reset the form
                console.log('Form submitted successfully!');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);
                
                // Show success message
                showSuccess();
                
                // Reset the form
                contactForm.reset();
            } else {
                // Scroll to the first error field
                const firstError = contactForm.querySelector('.error-message');
                if (firstError) {
                    firstError.parentNode.querySelector('input, textarea').focus();
                }
            }
        });
    }
    
    console.log('Portfolio JavaScript loaded successfully!');
});