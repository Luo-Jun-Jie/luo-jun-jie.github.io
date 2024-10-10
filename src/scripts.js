document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        menuItems.forEach((menuItem) => {
            menuItem.classList.remove("active");
            if (menuItem.getAttribute("href") === `#${current}`) {
                menuItem.classList.add("active");
            }
        });
    });
});
