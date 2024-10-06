document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".section-content");

    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", () => {
            // Remove the active class from all menu items
            menuItems.forEach(item => item.classList.remove("active"));

            // Hide all sections with fade-out effect
            sections.forEach(section => {
                section.classList.add("fade-out");
                setTimeout(() => {
                    section.classList.add("hidden");
                    section.classList.remove("fade-in", "fade-out");
                }, 300); // Delay corresponds to the duration of the fade-out effect
            });

            // Show the selected section with fade-in effect
            setTimeout(() => {
                sections[index].classList.remove("hidden");
                sections[index].classList.add("fade-in");
            }, 300); // This delay ensures the fade-out finishes before fade-in starts

            // Set the clicked menu item as active
            menuItem.classList.add("active");
        });
    });
});
