/* ============================================
   Portfolio — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll-triggered Animations (IntersectionObserver) ----
    const animElements = document.querySelectorAll('.animate-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animElements.forEach((el) => observer.observe(el));

    // ---- Sticky Nav Background on Scroll ----
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Active Nav Link Highlighting ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollY = window.scrollY + 120;
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ---- Mobile Nav Toggle ----
    const toggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            toggle.classList.toggle('active');
        });

        // Close on link click
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    // ---- Smooth scroll for anchor links (fallback) ----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
