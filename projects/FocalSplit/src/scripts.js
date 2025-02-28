document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll("section");

    // Intersection Observer to trigger animations and handle active menu item
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const sectionID = entry.target.getAttribute("id");

            // Handle visibility for animations
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Remove when not in view for repeat
            }

            // Handle the active menu item highlight
            if (entry.isIntersecting) {
                menuItems.forEach((menuItem) => {
                    menuItem.classList.remove("active");
                    if (menuItem.getAttribute("href") === `#${sectionID}`) {
                        menuItem.classList.add("active");
                    }
                });
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Smooth scrolling for menu items (optional enhancement)
    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = menuItem.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

let currentIndex = 0;
const images = document.querySelectorAll('.thumbnail');
const largeImage = document.getElementById('largeImage');

function changeImage(img) {
    largeImage.src = img.src;
    largeImage.style.objectFit = 'contain';
}

function autoRotateImages() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        largeImage.src = images[currentIndex].src;
        largeImage.style.objectFit = 'contain';
    }, 3000);
}

window.onload = autoRotateImages;