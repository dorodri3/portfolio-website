// main.js - Main JavaScript file for the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header and footer components
    loadHeader();
    loadFooter();

    // Add event listeners for interactive features
    const contactButton = document.getElementById('contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            alert('Contact form will be implemented soon!');
        });
    }
});

// Function to load the header component
function loadHeader() {
    import('./components/header.js').then(module => {
        const header = module.default();
        document.body.insertAdjacentHTML('afterbegin', header);
    });
}

// Function to load the footer component
function loadFooter() {
    import('./components/footer.js').then(module => {
        const footer = module.default();
        document.body.insertAdjacentHTML('beforeend', footer);
    });
}