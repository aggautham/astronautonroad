/* ==========================================================
   Gautham Portfolio
   script.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       DOM ELEMENTS
    ========================================================== */

    const header = document.getElementById("header");

    const navToggle = document.querySelector(".navbar__toggle");

    const mobileMenu = document.querySelector(".mobile-menu");

    const navLinks = document.querySelectorAll(
        ".navbar__link, .mobile-menu a"
    );

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );



    /* ==========================================================
       STICKY GLASS NAVBAR
    ========================================================== */

    const handleHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    handleHeader();

    window.addEventListener("scroll", handleHeader);



    /* ==========================================================
       MOBILE MENU
    ========================================================== */

    const openMenu = () => {

        navToggle.classList.add("active");

        mobileMenu.classList.add("active");

        document.body.classList.add("no-scroll");

        navToggle.setAttribute("aria-expanded", "true");

    };



    const closeMenu = () => {

        navToggle.classList.remove("active");

        mobileMenu.classList.remove("active");

        document.body.classList.remove("no-scroll");

        navToggle.setAttribute("aria-expanded", "false");

    };



    if (navToggle) {

        navToggle.addEventListener("click", () => {

            if (mobileMenu.classList.contains("active")) {

                closeMenu();

            } else {

                openMenu();

            }

        });

    }



    /* ==========================================================
       CLOSE MENU ON LINK CLICK
    ========================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });



    /* ==========================================================
       ESC KEY CLOSE
    ========================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });



    /* ==========================================================
       CLICK OUTSIDE MENU
    ========================================================== */

    mobileMenu.addEventListener("click", (event) => {

        if (event.target === mobileMenu) {

            closeMenu();

        }

    });



    /* ==========================================================
       SCROLL REVEAL
    ========================================================== */

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.15,

            rootMargin:"0px 0px -80px 0px"

        }

    );



    revealElements.forEach(element => {

        observer.observe(element);

    });



    /* ==========================================================
       ACTIVE NAVIGATION
    ========================================================== */

    const sections = document.querySelectorAll("section[id]");

    const activateNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (

                window.scrollY >= top &&

                window.scrollY < top + height

            ) {

                currentSection = section.id;

            }

        });

        document.querySelectorAll(".navbar__link").forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    };



    window.addEventListener("scroll", activateNavigation);

    activateNavigation();



    /* ==========================================================
       SMOOTH SCROLL
    ========================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });



    /* ==========================================================
       IMAGE LAZY LOADING
    ========================================================== */

    const lazyImages = document.querySelectorAll("img[data-src]");

    if (lazyImages.length) {

        const lazyObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const image = entry.target;

                    image.src = image.dataset.src;

                    image.removeAttribute("data-src");

                    observer.unobserve(image);

                });

            }

        );

        lazyImages.forEach(image => {

            lazyObserver.observe(image);

        });

    }



    /* 

==========================================================
       RESIZE SAFETY
    ========================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            closeMenu();

        }

    });

});