document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll("section");
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is requested, make everything visible up front.
    if (prefersReducedMotion) {
        sections.forEach((section) => section.classList.add('visible'));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const sectionID = entry.target.getAttribute("id");

            entry.target.classList.add('visible');

            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active");
                if (menuItem.getAttribute("href") === `#${sectionID}`) {
                    menuItem.classList.add("active");
                }
            });
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
        observer.observe(section);
    });

    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = menuItem.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });

    // Auto-update footer year so the copyright never goes stale.
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
