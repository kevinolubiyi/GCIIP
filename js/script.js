// script.js - Complete JavaScript for GCIIP Website

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // ===== HERO SLIDER =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto slide every 5 seconds
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Reset interval on manual navigation
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Initialize slider if elements exist
    if (slides.length > 0) {
        startSlideShow();
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetInterval();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                resetInterval();
            });
        });
    }

    // ===== SOLUTION TABS =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // ===== VISIONARY STORY TABS =====
    const storyTabs = document.querySelectorAll('.story-tab');
    const storyPanes = document.querySelectorAll('.story-pane');
    
    storyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            // Update tabs
            storyTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            storyPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === target) {
                    // Add slight delay for smooth animation
                    setTimeout(() => {
                        pane.classList.add('active');
                    }, 50);
                }
            });
        });
    });

    // ===== VISIONARY SECTION ANIMATIONS =====
    const mandateStats = document.querySelectorAll('.mandate-stat .percentage');
    
    function animatePercentages() {
        mandateStats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 20;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '%';
            }, 50);
        });
    }

    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // ===== CONTACT FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const organization = document.getElementById('organization').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !organization || !interest || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Get submit button and change text to "Sending..."
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                } else {
                    alert('There was an error submitting your form. Please try again or email us directly.');
                }
            } catch (error) {
                alert('There was an error submitting your form. Please try again or email us directly.');
            } finally {
                // Reset button text
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    } // REMOVED THE EXTRA CLOSING BRACE THAT WAS HERE

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // ===== ANIMATION ON SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.vga-feature, .ecosystem-card, .timeline-content, .benefit-card, .visionary-profile, .visionary-story, .visionary-cta');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Initial call
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // ===== INTERSECTION OBSERVER FOR ADVANCED ANIMATIONS =====
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate percentages when visionary CTA comes into view
                if (entry.target.classList.contains('visionary-cta')) {
                    animatePercentages();
                }
                
                // Add animation class
                entry.target.classList.add('animate-in');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe visionary section elements
    const visionaryElements = document.querySelectorAll('.visionary-profile, .visionary-story, .visionary-cta');
    visionaryElements.forEach(el => observer.observe(el));

    // ===== VGA CALCULATOR FUNCTIONALITY =====
    const vgaCalculator = document.querySelector('.vga-calculator');
    if (vgaCalculator) {
        const activitySelect = document.getElementById('activity-select');
        const frequencyInput = document.getElementById('frequency');
        const vgaResult = document.getElementById('vga-result');
        
        function calculateVGA() {
            const activityValue = parseFloat(activitySelect.value);
            const frequency = parseInt(frequencyInput.value) || 0;
            const result = activityValue * frequency;
            
            vgaResult.textContent = result;
        }
        
        activitySelect.addEventListener('change', calculateVGA);
        frequencyInput.addEventListener('input', calculateVGA);
    }

    // ===== COUNTER ANIMATION FOR STATISTICS =====
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current).toLocaleString();
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            updateCounter();
        });
    }

    // Initialize counters when stats section comes into view
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // ===== LAZY LOADING FOR IMAGES =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== FORM INPUT ENHANCEMENTS =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    console.log('GCIIP Website JavaScript initialized successfully!');
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Recalculate any layout-dependent elements if needed
});

// ===== LOAD EVENT HANDLER =====
window.addEventListener('load', function() {
    // Ensure all resources are loaded
    document.body.classList.add('loaded');
});