window.addEventListener("load", () => {
    const intro = document.getElementById("intro");

    setTimeout(() => {
        intro.classList.add("intro-hide");
    }, 1800);

    setTimeout(() => {
        intro.style.display = "none";
    }, 2600);
});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* =========================
   ACTIVE NAVBAR
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 180) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

/* =========================
   CLICK SOUND
========================= */

const clickSound = document.getElementById("click-sound");

clickSound.volume = 0.7;

document.addEventListener("click", (event) => {

    const clickable = event.target.closest(
        "a, button, .skill-list span, .project-placeholder"
    );

    if (!clickable) return;

    clickSound.currentTime = 0;

    clickSound.play().catch((error) => {
        console.log("Click sound error:", error);
    });

});

const backgroundMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("click", () => {
   backgroundMusic.volume = 0.5;

    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.classList.add("playing");
    } else {
        backgroundMusic.pause();
        musicToggle.classList.remove("playing");
    }
});

/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinksMenu = document.getElementById("nav-links");

if (menuToggle && navLinksMenu) {

    menuToggle.addEventListener("click", () => {

        navLinksMenu.classList.toggle("open");

        const isOpen = navLinksMenu.classList.contains("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });


    navLinksMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinksMenu.classList.remove("open");

            menuToggle.textContent = "☰";
        });

    });

}

/* =========================
   CLOSE MOBILE MENU
========================= */

document.addEventListener("click", (event) => {

    const clickedInsideMenu = navLinksMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        navLinksMenu.classList.remove("open");
        menuToggle.textContent = "☰";
    }

});


window.addEventListener("resize", () => {

    if (window.innerWidth > 600) {
        navLinksMenu.classList.remove("open");
        menuToggle.textContent = "☰";
    }

});