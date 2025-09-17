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
    // Dynamically add toggle button to nav if not present
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.querySelector('.dark-mode-toggle')) {
        const toggleLi = document.createElement('li');
        toggleLi.innerHTML = '<button class="dark-mode-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon dark-mode-icon"></i></button>';
        navMenu.appendChild(toggleLi);
        document.querySelector('.dark-mode-toggle').addEventListener('click', toggleDarkMode);
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
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Replace with your EmailJS Service ID and Template ID

    emailjs.sendForm("service_mdo0jec","template_2vv226u", this)
        .then(function() {
            showSuccessMessage('Message sent successfully!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('Failed to send:', error);
            showSuccessMessage('Oops! Something went wrong. Try again?');
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

function showSuccessMessage(message = 'Message sent successfully!') {
    // Remove existing message if any
    const existing = document.querySelector('.success-message');
    if (existing) existing.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `✅ ${message}`;
    document.body.appendChild(successDiv);

    // Show animation
    requestAnimationFrame(() => successDiv.classList.add('show'));

    // Auto-hide after 3s
    setTimeout(() => {
        successDiv.classList.add('slideOutRight');
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    // Listen for theme changes from system
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-mode', e.matches);
            updateDarkModeToggle(e.matches);
            updateNavbarBackground();
        }
    });
});