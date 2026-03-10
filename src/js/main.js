// main.js - Main JavaScript file for the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header and footer components
    loadHeader();
    loadFooter();

    // Page transitions and typed intro (if available)
    setupPageTransitions();
    setupTypedHeader();

    // Fade-in animations
    setupRevealOnScroll();
});

function setupPageTransitions() {
    const root = document.documentElement;

    // Remove fade overlay after the page is ready
    requestAnimationFrame(() => {
        root.classList.remove('page-transition');
    });

    // Animate links between pages (for internal HTML navigation)
    document.body.addEventListener('click', event => {
        const anchor = event.target.closest('a');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (href.startsWith('http') && !href.includes(window.location.host)) return;

        const isInternal = href.endsWith('.html') || href === 'index.html';
        if (!isInternal) return;

        event.preventDefault();
        root.classList.add('page-transition');
        setTimeout(() => {
            window.location.href = href;
        }, 280);
    });
}

function setupTypedHeader() {
    const nameEl = document.querySelector('.hero-name[data-text]');
    if (!nameEl) return;

    const text = nameEl.dataset.text;
    nameEl.textContent = '';

    let index = 0;
    const typingSpeed = 70;
    const cursor = document.createElement('span');
    cursor.className = 'hero-cursor';
    cursor.textContent = '|';
    nameEl.parentElement?.appendChild(cursor);

    const interval = setInterval(() => {
        nameEl.textContent += text.charAt(index);
        index += 1;
        if (index >= text.length) {
            clearInterval(interval);
            cursor.remove();
        }
    }, typingSpeed);
}

function setupRevealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        // Fallback: just reveal everything immediately
        elements.forEach(el => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));
}

// Function to load the header component
function loadHeader() {
    import('./components/header.js').then(module => {
        const header = module.default();
        const placeholder = document.getElementById('header');
        if (placeholder) placeholder.innerHTML = header;
    });
}

// Function to load the footer component
function loadFooter() {
    import('./components/footer.js').then(module => {
        const footer = module.default();
        const placeholder = document.getElementById('footer');
        if (placeholder) placeholder.innerHTML = footer;
    });
}