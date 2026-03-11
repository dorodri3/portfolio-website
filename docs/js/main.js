// main.js - Main JavaScript file for the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header and footer components
    loadHeader();
    loadFooter();

    // Page transitions and typed intro (if available)
    setupPageTransitions();
    setupTypedHeader();

    // Theme toggle (dark mode)
    setupThemeToggle();

    // Fade-in animations
    setupRevealOnScroll();

    // Carousel and testimonial rotations
    setupCarousels();
    setupTestimonials();

    // Project filters and modals
    setupProjectFilters();
    setupProjectModal();

    // Misc UI helpers
    setupAccordions();
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

    const interval = setInterval(() => {
        nameEl.textContent += text.charAt(index);
        index += 1;
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, typingSpeed);
}

function setupCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = [...carousel.querySelectorAll('.project-slide')];
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');

        if (!track || slides.length === 0 || !prevButton || !nextButton) return;

        let currentIndex = 0;

        const updateState = () => {
            const slideWidth = slides[0].offsetWidth + 18;
            const offset = currentIndex * slideWidth;
            track.style.transform = `translateX(-${offset}px)`;
        };

        prevButton.addEventListener('click', () => {
            // Wrap around to the last slide when reaching the beginning
            currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            updateState();
        });

        nextButton.addEventListener('click', () => {
            // Wrap around to the first slide when reaching the end
            currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            updateState();
        });

        window.addEventListener('resize', updateState);
        updateState();
    });
}

function setupTestimonials() {
    const container = document.querySelector('[data-testimonials]');
    if (!container) return;

    const cards = [...container.querySelectorAll('.testimonial-card')];
    if (cards.length <= 1) return;

    let activeIndex = 0;
    let rotationId = null;

    const setActive = idx => {
        activeIndex = idx;
        cards.forEach((card, i) => {
            const isActive = i === idx;
            card.style.opacity = isActive ? '1' : '0.35';
            card.style.transform = isActive ? 'scale(1.02)' : 'scale(0.98)';
            card.classList.toggle('active', isActive);
        });
    };

    const rotate = () => {
        setActive((activeIndex + 1) % cards.length);
    };

    const restartRotation = () => {
        if (rotationId) clearInterval(rotationId);
        rotationId = setInterval(rotate, 7000);
    };

    cards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            setActive(idx);
            restartRotation();
        });
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActive(idx);
                restartRotation();
            }
        });
    });

    setActive(0);
    restartRotation();
}

function setupProjectFilters() {
    const buttons = [...document.querySelectorAll('.filter-button')];
    const cards = [...document.querySelectorAll('[data-project-grid] .project-card')];
    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            buttons.forEach(b => b.classList.toggle('active', b === button));

            cards.forEach(card => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;
                card.style.display = show ? '' : 'none';
            });
        });
    });
}

function setupProjectModal() {
    const modal = document.querySelector('[data-modal]');
    const modalBody = modal?.querySelector('[data-modal-body]');
    const closeButtons = [...document.querySelectorAll('[data-close-modal]')];

    if (!modal || !modalBody) return;

    const details = {
        'project-1': {
            title: 'Onboarding Insights',
            body: '<p>Targeted research uncovered friction points during signup. We redesigned the experience with clearer progress feedback and reduced time-to-complete by 18%.</p><ul><li>User interviews</li><li>Prototype testing</li><li>Redesigned flow</li></ul>',
        },
        'project-2': {
            title: 'Design System Toolkit',
            body: '<p>Built a scalable design system with reusable components, documentation, and accessibility guidelines for faster product build cycles.</p><ul><li>Component library</li><li>Design tokens</li><li>Documentation hub</li></ul>',
        },
        'project-3': {
            title: 'Component System',
            body: '<p>Launched a shared component system across products, reducing inconsistencies and improving developer handoff.</p><ul><li>Shared library</li><li>Design tokens</li><li>Figma kit</li></ul>',
        },
        'project-4': {
            title: 'Usability Lab Sprint',
            body: '<p>Ran multiple testing sessions with users, prioritized usability discoveries, and iterated with measurable improvements in task success.</p><ul><li>Lab testing</li><li>Usability scoring</li><li>Action plan</li></ul>',
        },
    };

    function openModal(id) {
        const item = details[id];
        if (!item) return;
        modalBody.innerHTML = `<h3>${item.title}</h3>${item.body}`;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    document.querySelectorAll('[data-open-project]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.openProject;
            openModal(id);
        });
    });

    modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });
}

function setupThemeToggle() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    const setTheme = theme => {
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);

        const label = toggle.querySelector('.theme-label');
        const icon = toggle.querySelector('.theme-icon');
        if (label) label.textContent = isDark ? 'Light' : 'Dark';
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';

        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });
}

function setupAccordions() {
    document.querySelectorAll('.accordion').forEach(section => {
        const trigger = section.querySelector('.accordion-trigger');
        const panel = section.querySelector('.accordion-panel');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!expanded));
            panel.classList.toggle('active', !expanded);
            panel.style.maxHeight = !expanded ? `${panel.scrollHeight}px` : '0px';
        });
    });
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
    import('../components/header.js').then(module => {
        const header = module.default();
        const placeholder = document.getElementById('header');
        if (placeholder) placeholder.innerHTML = header;
    });
}

// Function to load the footer component
function loadFooter() {
    import('../components/footer.js').then(module => {
        const footer = module.default();
        const placeholder = document.getElementById('footer');
        if (placeholder) placeholder.innerHTML = footer;
    });
}