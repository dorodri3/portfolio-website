const Header = () => {
    return `
        <header class="site-header">
            <div class="header-content">
                <div class="brand">
                    <h2 class="brand-title">Darrell Rodriguez</h2>
                    <p class="brand-subtitle">I build thoughtful UX systems that people enjoy using.</p>
                </div>

                <nav aria-label="Primary">
                    <ul class="nav-list">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>

                <button class="theme-toggle" type="button" aria-label="Toggle dark mode" data-theme-toggle>
                    <span class="theme-icon">🌙</span>
                    <span class="theme-label">Dark</span>
                </button>
            </div>
        </header>
    `;
};

export default Header;