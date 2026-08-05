/* =========================================================
   GLOW — CINEMATIC INTRO + WEBSITE SCRIPT
   ========================================================= */


/* =========================================================
   PAGE LOCK DURING INTRO
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
   CINEMATIC SETTINGS
   ========================================================= */

const INTRO_DURATION = 3000;

let introFinished = false;
let introStarted = false;


/* =========================================================
   UNLOCK PAGE
   ========================================================= */

function unlockPage() {

    document.documentElement.classList.remove("intro-active");
    document.body.classList.remove("intro-active");

}


/* =========================================================
   CREATE CINEMATIC BLACK HOLE
   ========================================================= */

let introBlackHole =
    document.querySelector(".intro-black-hole");


if (!introBlackHole) {

    introBlackHole =
        document.createElement("div");

    introBlackHole.className =
        "intro-black-hole";

    cinematicIntro.appendChild(introBlackHole);

}


/* =========================================================
   CINEMATIC BLACK HOLE STYLE
   ========================================================= */

const blackHoleStyle =
    document.createElement("style");

blackHoleStyle.textContent = `

/* =========================================================
   CINEMATIC BLACK HOLE
   ========================================================= */

.intro-black-hole {

    position: absolute;

    left: 50%;
    top: 22%;

    width: min(15vw, 175px);
    height: min(15vw, 175px);

    transform:
        translate(-50%, -50%)
        scale(1);

    border-radius: 50%;

    z-index: 6;

    pointer-events: none;

    background:
        radial-gradient(
            circle at center,
            #000000 0%,
            #000000 34%,
            rgba(0,0,0,0.98) 43%,
            rgba(7,8,11,0.95) 48%,
            rgba(255,255,255,0.10) 54%,
            rgba(170,190,215,0.10) 59%,
            rgba(80,100,130,0.07) 64%,
            transparent 73%
        );

    box-shadow:
        0 0 18px rgba(255,255,255,0.08),
        0 0 45px rgba(150,170,200,0.10),
        0 0 90px rgba(100,130,170,0.08);

    will-change:
        transform,
        filter,
        opacity;

    animation:
        blackHoleRotation
        18s
        linear
        infinite;

}


/* =========================================================
   ROTATION
   ========================================================= */

@keyframes blackHoleRotation {

    from {

        transform:
            translate(-50%, -50%)
            rotate(0deg)
            scale(1);

    }

    to {

        transform:
            translate(-50%, -50%)
            rotate(360deg)
            scale(1);

    }

}


/* =========================================================
   BLACK HOLE EXIT
   ========================================================= */

.cinematic-intro.black-hole-exit
.intro-black-hole {

    animation:
        blackHoleCinematicExpansion
        2.65s
        cubic-bezier(0.22, 0.75, 0.18, 1)
        forwards;

}


/* =========================================================
   BLACK HOLE EXPANSION
   ========================================================= */

@keyframes blackHoleCinematicExpansion {

    0% {

        transform:
            translate(-50%, -50%)
            rotate(0deg)
            scale(1);

        filter:
            brightness(1);

    }

    18% {

        transform:
            translate(-50%, -50%)
            rotate(32deg)
            scale(1.35);

        filter:
            brightness(1.02);

    }

    36% {

        transform:
            translate(-50%, -50%)
            rotate(70deg)
            scale(2.2);

        filter:
            brightness(1.04);

    }

    54% {

        transform:
            translate(-50%, -50%)
            rotate(110deg)
            scale(4.5);

        filter:
            brightness(1.06);

    }

    70% {

        transform:
            translate(-50%, -50%)
            rotate(155deg)
            scale(9);

        filter:
            brightness(1.08);

    }

    84% {

        transform:
            translate(-50%, -50%)
            rotate(205deg)
            scale(18);

        filter:
            brightness(1.1);

    }

    94% {

        transform:
            translate(-50%, -50%)
            rotate(260deg)
            scale(30);

        filter:
            brightness(1.12);

    }

    100% {

        transform:
            translate(-50%, -50%)
            rotate(300deg)
            scale(45);

        filter:
            brightness(1.15);

    }

}


/* =========================================================
   CAMERA TARGETING
   ========================================================= */

.cinematic-intro.camera-flight
.intro-scene {

    animation:
        cinematicCameraFlight
        2.65s
        cubic-bezier(0.22, 0.75, 0.18, 1)
        forwards !important;

    transform-origin:
        50% 22%;

    will-change:
        transform,
        filter;

}


/* =========================================================
   CAMERA FLIGHT
   ========================================================= */

@keyframes cinematicCameraFlight {

    0% {

        transform:
            scale(1.03);

        filter:
            brightness(1)
            contrast(1);

    }

    12% {

        transform:
            scale(1.05);

        filter:
            brightness(1.005)
            contrast(1.005);

    }

    25% {

        transform:
            scale(1.10);

        filter:
            brightness(1.01)
            contrast(1.01);

    }

    40% {

        transform:
            scale(1.22);

        filter:
            brightness(1.015)
            contrast(1.015);

    }

    55% {

        transform:
            scale(1.48);

        filter:
            brightness(1.025)
            contrast(1.02);

    }

    68% {

        transform:
            scale(1.95);

        filter:
            brightness(1.04)
            contrast(1.03);

    }

    79% {

        transform:
            scale(2.65);

        filter:
            brightness(1.06)
            contrast(1.04);

    }

    88% {

        transform:
            scale(3.8);

        filter:
            brightness(1.09)
            contrast(1.06);

    }

    95% {

        transform:
            scale(5.7);

        filter:
            brightness(1.12)
            contrast(1.08);

    }

    100% {

        transform:
            scale(8.5);

        filter:
            brightness(1.15)
            contrast(1.1);

    }

}


/* =========================================================
   INTRO TEXT EXIT
   ========================================================= */

.cinematic-intro.camera-flight
.intro-content {

    animation:
        cinematicTextExit
        0.75s
        cubic-bezier(0.22, 0.61, 0.36, 1)
        forwards !important;

}


@keyframes cinematicTextExit {

    0% {

        opacity: 1;

        transform:
            translate(-50%, -50%)
            scale(1);

        filter:
            blur(0);

    }

    55% {

        opacity: 0.35;

        transform:
            translate(-50%, -50%)
            scale(0.985);

        filter:
            blur(1px);

    }

    100% {

        opacity: 0;

        transform:
            translate(-50%, -50%)
            scale(0.96);

        filter:
            blur(3px);

    }

}


/* =========================================================
   BLACK SCREEN
   ========================================================= */

.cinematic-intro.final-black {

    background:
        #000000 !important;

}


.cinematic-intro.final-black::after {

    content: "";

    position: absolute;

    inset: 0;

    z-index: 99999;

    background: #000000;

    opacity: 1;

    pointer-events: none;

}


/* =========================================================
   HOMEPAGE REVEAL
   ========================================================= */

body.intro-revealed .navbar,
body.intro-revealed .hero,
body.intro-revealed .section,
body.intro-revealed .final-cta,
body.intro-revealed footer {

    visibility: visible !important;

}

`;


/* Add styles */

document.head.appendChild(blackHoleStyle);


/* =========================================================
   RESET BLACK HOLE POSITION
   ========================================================= */

function resetBlackHole() {

    introBlackHole.classList.remove(
        "black-hole-exit"
    );

    introBlackHole.style.opacity = "1";

    introBlackHole.style.left = "50%";
    introBlackHole.style.top = "22%";

}


/* =========================================================
   ENTER GLOW
   ========================================================= */

enterGlow.addEventListener("click", () => {

    if (introStarted || introFinished) {
        return;
    }

    introStarted = true;

    document.body.classList.add(
        "intro-playing"
    );


    /* -----------------------------------------
       Begin camera flight
       ----------------------------------------- */

    cinematicIntro.classList.add(
        "camera-flight"
    );


    /* -----------------------------------------
       Begin black hole expansion
       ----------------------------------------- */

    cinematicIntro.classList.add(
        "black-hole-exit"
    );


    /* -----------------------------------------
       Remove text immediately but smoothly
       ----------------------------------------- */

    const introContent =
        cinematicIntro.querySelector(
            ".intro-content"
        );

    if (introContent) {

        introContent.style.pointerEvents =
            "none";

    }


    /* -----------------------------------------
       Final black moment
       ----------------------------------------- */

    setTimeout(() => {

        cinematicIntro.classList.add(
            "final-black"
        );

    }, 2680);


    /* -----------------------------------------
       Reveal homepage
       ----------------------------------------- */

    setTimeout(() => {

        introFinished = true;

        cinematicIntro.style.display =
            "none";

        document.body.classList.remove(
            "intro-playing"
        );

        document.body.classList.add(
            "intro-revealed"
        );

        unlockPage();

    }, INTRO_DURATION);

});


/* =========================================================
   SKIP INTRO
   ========================================================= */

skipIntro.addEventListener("click", () => {

    if (introFinished) {
        return;
    }


    /* -----------------------------------------
       Mark intro finished
       ----------------------------------------- */

    introFinished = true;
    introStarted = true;


    /* -----------------------------------------
       Stop all cinematic animations
       ----------------------------------------- */

    cinematicIntro.classList.remove(
        "camera-flight",
        "black-hole-exit",
        "final-black"
    );


    cinematicIntro.style.animation =
        "none";

    cinematicIntro.style.transition =
        "none";


    /* -----------------------------------------
       Hide intro immediately
       ----------------------------------------- */

    cinematicIntro.style.opacity =
        "0";

    cinematicIntro.style.visibility =
        "hidden";

    cinematicIntro.style.pointerEvents =
        "none";


    cinematicIntro.style.display =
        "none";


    /* -----------------------------------------
       Show homepage
       ----------------------------------------- */

    document.body.classList.remove(
        "intro-playing"
    );

    document.body.classList.add(
        "intro-revealed"
    );


    /* -----------------------------------------
       Unlock page scrolling
       ----------------------------------------- */

    unlockPage();

});


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

const slides = [

    {
        title: "Red Sprites",

        description:
            "Experience Minecraft skies like never before.",

        image:
            "red-sprites-hero.png"
    },

    {
        title: "Aurora",

        description:
            "Bring atmospheric skies and immersive light to your world.",

        image:
            "aurora-hero.png"
    },

    {
        title: "Cinematic",

        description:
            "Experience beautiful lighting and breathtaking Minecraft worlds.",

        image:
            "sunset-hero.png"
    }

];


let currentSlide = 0;
let slideTimer;


const heroBackground =
    document.querySelector(
        ".hero-background"
    );


const heroTitle =
    document.getElementById(
        "heroTitle"
    );


const heroDescription =
    document.getElementById(
        "heroDescription"
    );


const sliderDots =
    document.querySelectorAll(
        "#sliderDots button"
    );


/* =========================================================
   SET HERO IMAGE
   ========================================================= */

function setHeroImage(image) {

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

    const image =
        new Image();

    image.src =
        slide.image;

});


/* =========================================================
   SHOW SLIDE
   ========================================================= */

function showSlide(index) {

    currentSlide =
        (index + slides.length)
        % slides.length;


    const slide =
        slides[currentSlide];


    /* Fade current slide */

    heroTitle.style.opacity =
        "0";

    heroDescription.style.opacity =
        "0";

    heroBackground.style.opacity =
        "0";


    setTimeout(() => {

        heroTitle.textContent =
            slide.title;

        heroDescription.textContent =
            slide.description;

        setHeroImage(
            slide.image
        );


        heroTitle.style.opacity =
            "1";

        heroDescription.style.opacity =
            "1";

        heroBackground.style.opacity =
            "1";

    }, 350);


    /* Update dots */

    sliderDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );


    /* Restart automatic slideshow */

    clearTimeout(
        slideTimer
    );


    slideTimer =
        setTimeout(() => {

            showSlide(
                currentSlide + 1
            );

        }, 4000);

}


/* =========================================================
   DOT NAVIGATION
   ========================================================= */

sliderDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(
                    index
                );

            }
        );

    }
);


/* =========================================================
   START HERO SLIDESHOW
   ========================================================= */

setHeroImage(
    slides[0].image
);


sliderDots.forEach(
    (dot, i) => {

        dot.classList.toggle(
            "active",
            i === 0
        );

    }
);


slideTimer =
    setTimeout(() => {

        showSlide(1);

    }, 4000);


/* =========================================================
   SEARCH
   ========================================================= */

const searchButton =
    document.getElementById(
        "searchButton"
    );


const searchOverlay =
    document.getElementById(
        "searchOverlay"
    );


const closeSearch =
    document.getElementById(
        "closeSearch"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


/* =========================================================
   OPEN SEARCH
   ========================================================= */

searchButton.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add(
            "active"
        );


        setTimeout(() => {

            searchInput.focus();

        }, 300);

    }
);


/* =========================================================
   CLOSE SEARCH
   ========================================================= */

closeSearch.addEventListener(
    "click",
    () => {

        searchOverlay.classList.remove(
            "active"
        );

        searchInput.value =
            "";

        searchResults.innerHTML =
            "";

    }
);


/* =========================================================
   CLOSE SEARCH WITH ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            searchOverlay.classList.remove(
                "active"
            );

            searchInput.value =
                "";

            searchResults.innerHTML =
                "";

        }

    }
);


/* =========================================================
   SHADER SEARCH DATA
   ========================================================= */

const shaders = [

    {
        name:
            "Red Sprites",

        category:
            "Atmospheric",

        description:
            "Atmospheric lightning high above the clouds."
    },

    {
        name:
            "Aurora",

        category:
            "Atmospheric",

        description:
            "Immersive aurora effects and atmospheric skies."
    }

];


/* =========================================================
   SEARCH
   ========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        searchResults.innerHTML =
            "";


        if (!query) {
            return;
        }


        const results =
            shaders.filter(
                shader => {

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

                }
            );


        if (
            results.length ===
            0
        ) {

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


        results.forEach(
            shader => {

                const result =
                    document.createElement(
                        "div"
                    );


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

            }
        );

    }
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .shader-card, .feature, .release"
    );


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   REVEAL STYLES
   ========================================================= */

const revealStyle =
    document.createElement(
        "style"
    );


revealStyle.textContent = `

    .reveal {

        opacity: 0;

        transform:
            translateY(45px)
            scale(0.98);

        transition:
            opacity 0.9s ease,
            transform
            0.9s
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
    .querySelectorAll(
        'a[href="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        }
    );
