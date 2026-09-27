// Dark Mode Management
function initDarkMode() {
    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeToggle(true);
    } else {
        updateDarkModeToggle(false);
    }
    
    // Wait for DOM and add toggle if missing (now handles mobile too)
    function addToggleIfNeeded() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !document.querySelector('.dark-mode-toggle')) {
            const toggleLi = document.createElement('li');
            toggleLi.innerHTML = '<button class="dark-mode-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon dark-mode-icon"></i></button>';
            navMenu.appendChild(toggleLi);
            document.querySelector('.dark-mode-toggle').addEventListener('click', toggleDarkMode);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addToggleIfNeeded);
    } else {
        addToggleIfNeeded();
    }
    
    updateNavbarBackground(); // Initial navbar update
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateDarkModeToggle(isDarkMode);
    updateNavbarBackground(); // Ensure immediate theme update on nav
}

function updateDarkModeToggle(isDarkMode) {
    const icon = document.querySelector('.dark-mode-icon');
    if (icon) {
        icon.className = `fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} dark-mode-icon`;
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent bubbling to document click handler
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect (Theme-Aware)
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const scrollTop = window.pageYOffset;
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbarBackground);

// EmailJS Form Handling
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // The EmailJS script can be blocked by school filters or ad blockers.
    if (typeof emailjs === 'undefined') {
        showSuccessMessage('Message not sent: the email service did not load. Please reach me on LinkedIn instead.', true);
        return;
    }

    emailjs.sendForm("service_mdo0jec", "template_2vv226u", this)
        .then(function() {
            showSuccessMessage('Message sent. Thanks for reaching out!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('EmailJS send failed:', error);
            showSuccessMessage('Message not sent. Please try again, or reach me on LinkedIn.', true);
        });
});

// Existing Discord Popup (Enhanced for Social Button)
function showDiscordPopup(username) {
    const overlay = document.createElement('div');
    overlay.className = 'discord-popup-overlay';
    const popup = document.createElement('div');
    popup.className = 'discord-popup';
    popup.innerHTML = `
        <h3>My Discord</h3>
        <p>Username: ${username}</p>
        <button id="copy-discord">Copy Username</button>
        <button id="close-popup">Close</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);

    // Copy functionality
    document.getElementById('copy-discord').addEventListener('click', () => {
        navigator.clipboard.writeText(username).then(() => {
            const button = document.getElementById('copy-discord');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => button.textContent = originalText, 2000);
        });
    });

    // Close functionality
    document.getElementById('close-popup').addEventListener('click', () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        }
    });
}

function toggleBio() {
    const overlay = document.getElementById('bioOverlay');
    const container = document.querySelector('.profile-pic-container');
    if (overlay) {
        overlay.classList.toggle('show');
    }
    if (container) {
        container.classList.toggle('active');
    }
}

function showSuccessMessage(message = 'Message sent.', isError = false) {
    // Remove existing message if any
    const existing = document.querySelector('.success-message');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = isError ? 'success-message error-message' : 'success-message';
    toast.setAttribute('role', isError ? 'alert' : 'status');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto-hide; errors stay up longer so they can be read
    setTimeout(() => {
        toast.classList.add('slideOutRight');
        setTimeout(() => toast.remove(), 300);
    }, isError ? 6000 : 3000);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    updateNavbarBackground(); // New: Init mobile menu
    // Listen for theme changes from system
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-mode', e.matches);
            updateDarkModeToggle(e.matches);
            updateNavbarBackground();
        }
    });
});