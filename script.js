// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Language selection handling
window.addEventListener('load', () => {
    const userLang = navigator.language || navigator.userLanguage;
    const languageBanner = document.getElementById('language-banner');

    // Show language banner for Polish users if they haven't made a choice before
    if (userLang.startsWith('pl') && !localStorage.getItem('languageChoice')) {
        languageBanner.style.display = 'block';
        // Adjust navbar position when banner is shown
        document.getElementById('navbar').style.top = '50px';
    }

    // Handle language choice buttons
    document.getElementById('choose-english').addEventListener('click', () => {
        localStorage.setItem('languageChoice', 'en');
        languageBanner.style.display = 'none';
        document.getElementById('navbar').style.top = '0';
    });

    document.getElementById('choose-polish').addEventListener('click', () => {
        localStorage.setItem('languageChoice', 'pl');
        window.location.href = 'index_pl.html';
    });

    document.getElementById('close-language-banner').addEventListener('click', () => {
        localStorage.setItem('languageChoice', 'dismissed');
        languageBanner.style.display = 'none';
        document.getElementById('navbar').style.top = '0';
    });

    // Cookie consent handling
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }

    // Accept cookies button
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem("consentGranted", "true");

        // Update Google Analytics consent
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });
        }

        localStorage.setItem('cookiesAccepted', 'true');
        document.getElementById('cookie-banner').style.display = 'none';
    });

    // Reject non-essential cookies button
    document.getElementById('reject-cookies').addEventListener('click', () => {
        localStorage.setItem("consentGranted", "false");

        // Keep analytics denied for non-essential rejection
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
            });
        }

        localStorage.setItem('cookiesAccepted', 'rejected');
        document.getElementById('cookie-banner').style.display = 'none';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add staggered animation delays
document.querySelectorAll('.process-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});
