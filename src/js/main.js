// main.js - Main JavaScript file for the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header and footer components
    loadHeader();
    loadFooter();

    // Smooth scroll for same-page navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

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