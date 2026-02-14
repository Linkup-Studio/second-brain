document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;

            if (panel.style.display === 'block') {
                panel.style.display = 'none';
                this.textContent = this.textContent.replace('-', '+'); // Simple icon toggle logic if needed
            } else {
                panel.style.display = 'block';
                // this.textContent = this.textContent.replace('+', '-');
            }
        });
    });

    // Smooth Scroll for specific anchor links if needed (CSS scroll-behavior is usually enough)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-Triggered Mobile Bottom Nav (Direct Style Manipulation)
    const bottomNav = document.querySelector('.mobile-bottom-nav');

    if (bottomNav) {
        const toggleNav = () => {
            // Check all possible scroll properties for compatibility
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            // Should be visible by default (CSS).
            // We only HIDE it if we are at the very top.

            // Should be visible by default (CSS).
            // We only HIDE it if we are at the very top.

            // Hide if scrolled LESS than 50px
            if (scrollTop < 50) {
                bottomNav.classList.add('is-hidden');
            } else {
                bottomNav.classList.remove('is-hidden');
            }
        };

        // Listen on window
        window.addEventListener('scroll', toggleNav);
        window.addEventListener('resize', toggleNav); // Also check on resize
        // Also listen on touchmove for iOS
        window.addEventListener('touchmove', toggleNav);

        // Initial check
        toggleNav();
    }
});
