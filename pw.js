// Discord Popup Function (define globally)
function showDiscordPopup(username) {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'discord-popup-overlay';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'discord-popup';
    
    popup.innerHTML = `
        <i class="fab fa-discord discord-popup-icon"></i>
        <h3>My Discord</h3>
        <p class="discord-username">${username}</p>
        <button id="copy-discord" class="discord-copy-btn">
            <i class="fas fa-copy"></i> Copy Username
        </button>
        <button id="close-popup" class="discord-close-btn">Close</button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Copy button functionality
    document.getElementById('copy-discord').addEventListener('click', () => {
        navigator.clipboard.writeText(username).then(() => {
            const copyBtn = document.getElementById('copy-discord');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Username';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            // Fallback for browsers that don't support clipboard API
            const copyBtn = document.getElementById('copy-discord');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('copied');
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = username;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Username';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
    
    // Close popup
    const closePopup = () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        popup.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    };
    
    document.getElementById('close-popup').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
}

function toggleBio() {
    const overlay = document.getElementById('bioOverlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
    document.querySelector('.profile-pic-container').classList.toggle('active');
}

// Dark Mode Toggle Functions
function initDarkMode() {
    // Check for saved dark mode preference or default to user's system preference
    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeToggle(true);
    }
    
    // Add dark mode toggle to navbar
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.querySelector('.dark-mode-toggle')) {
        const darkModeToggle = document.createElement('li');
        darkModeToggle.innerHTML = `
            <button class="dark-mode-toggle" aria-label="Toggle dark mode">
                <i class="fas fa-moon dark-mode-icon"></i>
            </button>
        `;
        navMenu.appendChild(darkModeToggle);
        
        // Add click event
        darkModeToggle.querySelector('.dark-mode-toggle').addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update icon
    updateDarkModeToggle(isDarkMode);
    
    // Smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

function updateDarkModeToggle(isDarkMode) {
    const icon = document.querySelector('.dark-mode-icon');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun dark-mode-icon' : 'fas fa-moon dark-mode-icon';
    }
}

// Show success message after form submission
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '✅ Message sent successfully!';
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (currentScroll > 50) {
            navbar.style.background = isDarkMode
                ? 'rgba(17, 24, 39, 0.98)'
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = isDarkMode
                ? 'rgba(17, 24, 39, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        // Hide/Show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }

    lastScroll = currentScroll;
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject')?.value || 'No Subject';
            const message = document.getElementById('message').value;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // EmailJS Implementation
            try {
                // Initialize EmailJS with your public key
                emailjs.init("zSyPf3-yjmIDPSg_8"); // Replace with your EmailJS public key
                
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'jonathanshin310@gmail.com'
                };
                
                await emailjs.send(
                    'service_mdo0jec',
                    'template_6j6aj2o',
                    templateParams
                );
                
                showSuccessMessage();
                contactForm.reset();
            } catch (error) {
                console.error('Failed to send email:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            }
            
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Add animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('facts-container') ||
                    entry.target.parentElement.classList.contains('links-grid') ||
                    entry.target.parentElement.classList.contains('about-grid')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.about-card, .fact-item, .link-card, .gpa-card, .course-item, ' +
        '.activity-card, .project-showcase-card, .award-card, .mini-project'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Fun hover effects for fact items
    const factItems = document.querySelectorAll('.fact-item');
    factItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const emoji = this.querySelector('.fact-emoji');
            if (emoji) {
                emoji.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const emoji = this.querySelector('.fact-emoji');
            if (emoji) {
                emoji.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'pw.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Fun Easter Egg - Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 3s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
    
    confetti();
}

// Simple confetti effect
function confetti() {
    const colors = ['#5B21B6', '#EC4899', '#06B6D4', '#FBBF24', '#10B981'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${2 + Math.random() * 3}s ease-in-out;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Console message
console.log('%c🎓 Welcome to my portfolio! ', 'font-size: 20px; color: #5B21B6; font-weight: bold;');
console.log('%cFeel free to explore and don\'t forget to try the Konami code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 14px; color: #EC4899;');