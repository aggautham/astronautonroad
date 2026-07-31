/* ==========================================================
   JOURNEY PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Smooth Scroll
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",
                    block:"start"

                });

            }

        });

    });



    /* ==========================================
       Gallery Lightbox
    ========================================== */

    const images = document.querySelectorAll(".gallery-grid img");

    if(images.length){

        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `

            <span class="lightbox-close">&times;</span>

            <img src="" alt="">

        `;

        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector("img");

        images.forEach(image => {

            image.addEventListener("click", () => {

                lightbox.classList.add("active");

                lightboxImage.src = image.src;

                lightboxImage.alt = image.alt;

                document.body.style.overflow = "hidden";

            });

        });

        lightbox.addEventListener("click", () => {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

        });

    }

});

