const Footer = () => {
    const year = new Date().getFullYear();
    return `
        <footer class="site-footer">
            <div class="footer-content">
                <p>&copy; ${year} Darrell Rodriguez. All rights reserved.</p>
                <nav aria-label="Footer">
                    <ul class="nav-list">
                        <li><a href="#about">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    `;
};

export default Footer;