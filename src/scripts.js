document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll("section[id]");

    // Auto-update footer year so the copyright never goes stale.
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Reveal sections as they scroll into view and highlight the active nav item.
    // Anchor navigation itself is native: CSS scroll-behavior handles smoothness
    // (and prefers-reduced-motion), so the URL hash stays in sync.
    // Fail open: if IntersectionObserver is unavailable, show everything.
    if (!('IntersectionObserver' in window)) {
        sections.forEach((section) => section.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const sectionID = entry.target.getAttribute("id");

            entry.target.classList.add('visible');

            menuItems.forEach((menuItem) => {
                const isActive = menuItem.getAttribute("href") === `#${sectionID}`;
                menuItem.classList.toggle("active", isActive);
                if (isActive) {
                    menuItem.setAttribute("aria-current", "true");
                } else {
                    menuItem.removeAttribute("aria-current");
                }
            });
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
        observer.observe(section);
    });
});
