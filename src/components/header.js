const Header = () => {
    return `
        <header class="site-header">
            <div class="header-content">
                <div class="brand">
                    <h1 class="hero-title">Darrell Rodriguez</h1>
                    <p class="hero-subtitle">I build thoughtful UX systems that people enjoy using.</p>
                </div>

                <nav aria-label="Primary">
                    <ul class="nav-list">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
};

export default Header;