// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
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

    // Navbar Background on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });

    // Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Remove all theme classes
            body.classList.remove('modern', 'industrial', 'safety');
            
            // Add selected theme
            const theme = this.dataset.theme;
            if (theme === 'modern') {
                // Modern theme is default (no class needed)
            } else {
                body.classList.add(theme);
            }
        });
    });

    // Scroll Animations (Fade In Up)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.service-card, .about, .contact, .stats .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Service Cards Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Floating Call Button Animation
    const floatingCall = document.querySelector('.floating-call');
    let callPulse = 0;
    
    setInterval(() => {
        callPulse += 0.1;
        const scale = 1 + Math.sin(callPulse) * 0.05;
        floatingCall.style.transform = `scale(${scale})`;
    }, 100);

    // Phone Numbers Click-to-Call Enhancement
    document.querySelectorAll('.phone-link, .btn-primary[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add haptic feedback or visual confirmation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // WhatsApp Button Enhancement
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.innerHTML = '<i class="fab fa-whatsapp"></i> Send Message';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.innerHTML = 'Message on WhatsApp';
        });
    }

    // Hero Section Typing Effect (Optional Enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Uncomment below for typing effect on tagline
    /*
    window.addEventListener('load', function() {
        const tagline = document.querySelector('.hero-tagline');
        const originalText = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, originalText, 80);
        }, 1000);
    });
    */

    // Parallax Effect for Hero (Subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${speed}px)`;
        }
    });

    // Stats Counter Animation (On Scroll)
    const stats = document.querySelectorAll('.stat span');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                    let count = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            stat.textContent = stat.textContent;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(count) + (stat.textContent.includes('+') ? '+' : '');
                        }
                    }, 20);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelector('.stats').addEventListener('mouseenter', function() {
        statsObserver.observe(this);
    });

    // Preloader (Optional - Remove if not needed)
    /*
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    */

    console.log('✅ Ma Bhavani Motor Rewinding Workshop - All scripts loaded successfully!');
});

// Mobile Responsiveness Enhancements
function handleResize() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Service Worker Registration (PWA Ready - Optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}