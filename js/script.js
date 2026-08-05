/* =========================================================
   GLOW — SCRIPT.JS
   ========================================================= */


/* =========================================================
   LOCK PAGE DURING CINEMATIC INTRO
   ========================================================= */

document.documentElement.classList.add("intro-active");
document.body.classList.add("intro-active");


/* =========================================================
   CINEMATIC INTRO ELEMENTS
   ========================================================= */

const cinematicIntro =
    document.getElementById("cinematicIntro");

const enterGlow =
    document.getElementById("enterGlow");

const skipIntro =
    document.getElementById("skipIntro");


/* =========================================================
   INTRO STATE
   ========================================================= */

let introFinished = false;
let introRunning = false;


/* =========================================================
   UNLOCK PAGE
   ========================================================= */

function unlockPage() {

    document.documentElement.classList.remove("intro-active");
    document.body.classList.remove("intro-active");

}


/* =========================================================
   FINISH INTRO
   ========================================================= */

function finishIntro() {

    if (introFinished) {
        return;
    }

    introFinished = true;
    introRunning = false;

    cinematicIntro.classList.remove("intro-exit");

    cinematicIntro.classList.add("skip-intro-now");

    document.body.classList.remove("intro-playing");

    unlockPage();

    setTimeout(() => {

        cinematicIntro.style.display = "none";

    }, 50);

}


/* =========================================================
   ENTER GLOW
   ========================================================= */

function startCinematicIntro() {

    if (introRunning || introFinished) {
        return;
    }

    introRunning = true;

    document.body.classList.add("intro-playing");

    /*
       Force browser to acknowledge the current state
       before starting the cinematic animation.
    */

    cinematicIntro.offsetHeight;

    cinematicIntro.classList.add("intro-exit");


    /*
       The complete cinematic lasts 3 seconds.

       0.00–0.65
       Text disappears.

       0.45–2.55
       Camera begins moving toward the black hole.

       1.25–2.65
       Black hole expands as the camera approaches.

       2.55–2.90
       Screen becomes black.

       2.90–3.00
       Homepage is revealed.
    */

    setTimeout(() => {

        if (!introFinished) {
            finishIntro();
        }

    }, 3000);

}


if (enterGlow) {

    enterGlow.addEventListener(
        "click",
        startCinematicIntro
    );

}


/* =========================================================
   SKIP INTRO
   ========================================================= */

function skipCinematicIntro() {

    if (introFinished) {
        return;
    }

    introRunning = false;
    introFinished = true;


    /*
       Cancel every cinematic animation immediately.
    */

    cinematicIntro.classList.remove("intro-exit");

    cinematicIntro.classList.add("skip-intro-now");


    /*
       Make absolutely sure the overlay disappears.
    */

    cinematicIntro.style.animation = "none";
    cinematicIntro.style.transition = "none";

    cinematicIntro.style.opacity = "0";
    cinematicIntro.style.visibility = "hidden";
    cinematicIntro.style.pointerEvents = "none";


    document.body.classList.remove("intro-playing");


    unlockPage();


    /*
       Remove the intro completely after the browser
       has rendered the hidden state.
    */

    requestAnimationFrame(() => {

        cinematicIntro.style.display = "none";

    });

}


if (skipIntro) {

    skipIntro.addEventListener(
        "click",
        skipCinematicIntro
    );

}


/* =========================================================
   KEYBOARD SKIP
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (
            !introFinished &&
            cinematicIntro &&
            cinematicIntro.style.display !== "none"
        ) {

            skipCinematicIntro();

        }

    }

});


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

const slides = [

    {
        title: "Red Sprites",
        description:
            "Experience Minecraft skies like never before.",
        image: "red-sprites-hero.png"
    },

    {
        title: "Aurora",
        description:
            "Bring atmospheric skies and immersive light to your world.",
        image: "aurora-hero.png"
    },

    {
        title: "Cinematic",
        description:
            "Experience beautiful lighting and breathtaking Minecraft worlds.",
        image: "sunset-hero.png"
    }

];


let currentSlide = 0;
let slideTimer;


/* =========================================================
   HERO ELEMENTS
   ========================================================= */

const heroBackground =
    document.querySelector(".hero-background");

const heroTitle =
    document.getElementById("heroTitle");

const heroDescription =
    document.getElementById("heroDescription");

const sliderDots =
    document.querySelectorAll("#sliderDots button");


/* =========================================================
   SET HERO IMAGE
   ========================================================= */

function setHeroImage(image) {

    if (!heroBackground) {
        return;
    }

    heroBackground.style.backgroundImage = `

        linear-gradient(
            90deg,
            rgba(5, 6, 8, 0.88) 0%,
            rgba(5, 6, 8, 0.55) 45%,
            rgba(5, 6, 8, 0.15) 100%
        ),

        url("${image}")

    `;

}


/* =========================================================
   PRELOAD HERO IMAGES
   ========================================================= */

slides.forEach(slide => {

    const image = new Image();

    image.src = slide.image;

});


/* =========================================================
   SHOW SLIDE
   ========================================================= */

function showSlide(index) {

    if (
        !heroTitle ||
        !heroDescription ||
        !heroBackground
    ) {
        return;
    }


    currentSlide =
        (index + slides.length) % slides.length;


    const slide =
        slides[currentSlide];


    /*
       Fade content and image out together.
    */

    heroTitle.style.opacity = "0";
    heroDescription.style.opacity = "0";
    heroBackground.style.opacity = "0";


    setTimeout(() => {

        heroTitle.textContent =
            slide.title;

        heroDescription.textContent =
            slide.description;

        setHeroImage(slide.image);


        heroTitle.style.opacity = "1";
        heroDescription.style.opacity = "1";
        heroBackground.style.opacity = "1";

    }, 350);


    /*
       Update dots.
    */

    sliderDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    /*
       Restart slideshow timer.
    */

    clearTimeout(slideTimer);

    slideTimer = setTimeout(() => {

        showSlide(currentSlide + 1);

    }, 4000);

}


/* =========================================================
   DOT NAVIGATION
   ========================================================= */

sliderDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});


/* =========================================================
   START HERO SLIDESHOW
   ========================================================= */

if (heroBackground) {

    setHeroImage(
        slides[0].image
    );

}


sliderDots.forEach((dot, i) => {

    dot.classList.toggle(
        "active",
        i === 0
    );

});


slideTimer = setTimeout(() => {

    showSlide(1);

}, 4000);


/* =========================================================
   SEARCH
   ========================================================= */

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");


/* =========================================================
   OPEN SEARCH
   ========================================================= */

if (searchButton) {

    searchButton.addEventListener("click", () => {

        searchOverlay.classList.add("active");

        setTimeout(() => {

            searchInput.focus();

        }, 300);

    });

}


/* =========================================================
   CLOSE SEARCH
   ========================================================= */

function closeSearchOverlay() {

    if (!searchOverlay) {
        return;
    }

    searchOverlay.classList.remove("active");

    if (searchInput) {
        searchInput.value = "";
    }

    if (searchResults) {
        searchResults.innerHTML = "";
    }

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        closeSearchOverlay
    );

}


/* =========================================================
   ESCAPE SEARCH
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        searchOverlay &&
        searchOverlay.classList.contains("active")
    ) {

        closeSearchOverlay();

    }

});


/* =========================================================
   SHADER SEARCH DATA
   ========================================================= */

const shaders = [

    {
        name: "Red Sprites",
        category: "Atmospheric",
        description:
            "Atmospheric lightning high above the clouds."
    },

    {
        name: "Aurora",
        category: "Atmospheric",
        description:
            "Immersive aurora effects and atmospheric skies."
    }

];


/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .toLowerCase()
                    .trim();


            searchResults.innerHTML = "";


            if (!query) {
                return;
            }


            const results =
                shaders.filter(shader => {

                    return (

                        shader.name
                            .toLowerCase()
                            .includes(query)

                        ||

                        shader.category
                            .toLowerCase()
                            .includes(query)

                        ||

                        shader.description
                            .toLowerCase()
                            .includes(query)

                    );

                });


            if (results.length === 0) {

                searchResults.innerHTML = `

                    <p style="
                        margin-top: 25px;
                        color: #9da3ad;
                    ">

                        No shaders found.

                    </p>

                `;

                return;

            }


            results.forEach(shader => {

                const result =
                    document.createElement("div");


                result.style.marginTop =
                    "25px";

                result.style.padding =
                    "20px";

                result.style.border =
                    "1px solid rgba(255,255,255,0.09)";

                result.style.borderRadius =
                    "14px";


                result.innerHTML = `

                    <strong>
                        ${shader.name}
                    </strong>

                    <p style="
                        margin-top: 5px;
                        color: #9da3ad;
                        font-size: 0.85rem;
                    ">

                        ${shader.description}

                    </p>

                `;


                searchResults.appendChild(
                    result
                );

            });

        }
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .shader-card, .feature, .release"
    );


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


/* =========================================================
   ADD REVEAL CLASS
   ========================================================= */

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   REVEAL STYLES
   ========================================================= */

const revealStyle =
    document.createElement("style");


revealStyle.textContent = `

    .reveal {

        opacity: 0;

        transform:
            translateY(45px)
            scale(0.98);

        transition:
            opacity 0.9s ease,
            transform 0.9s
            cubic-bezier(
                0.22,
                1,
                0.36,
                1
            );

    }


    .revealed {

        opacity: 1;

        transform:
            translateY(0)
            scale(1);

    }

`;


document.head.appendChild(
    revealStyle
);


/* =========================================================
   PREVENT EMPTY HASH LINKS
   ========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });
