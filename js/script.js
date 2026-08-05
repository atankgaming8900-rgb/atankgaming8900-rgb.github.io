/* =========================================================
   GLOW — CINEMATIC INTRO + WEBSITE SCRIPT
   ========================================================= */


/* =========================================================
   CINEMATIC INTRO — ULTRA SMOOTH VERSION
   ========================================================= */

const cinematicIntro =
    document.getElementById("cinematicIntro");

const enterGlow =
    document.getElementById("enterGlow");

const skipIntro =
    document.getElementById("skipIntro");


let introStarted = false;
let introFinished = false;


/* =========================================================
   PAGE LOCK
   ========================================================= */

document.documentElement.classList.add("intro-active");
document.body.classList.add("intro-active");


function unlockPage() {

    document.documentElement.classList.remove(
        "intro-active"
    );

    document.body.classList.remove(
        "intro-active"
    );

}


/* =========================================================
   CREATE BLACK HOLE
   ========================================================= */

let introBlackHole =
    cinematicIntro.querySelector(
        ".intro-black-hole"
    );


if (!introBlackHole) {

    introBlackHole =
        document.createElement("div");

    introBlackHole.className =
        "intro-black-hole";

    cinematicIntro.appendChild(
        introBlackHole
    );

}


/* =========================================================
   CINEMATIC BLACK HOLE CSS
   ========================================================= */

const cinematicStyle =
    document.createElement("style");


cinematicStyle.textContent = `

/* =========================================================
   BLACK HOLE
   ========================================================= */

.intro-black-hole {

    position: absolute;

    left: 50%;
    top: 22%;

    width: min(15vw, 175px);
    height: min(15vw, 175px);

    transform:
        translate3d(-50%, -50%, 0)
        scale(1);

    border-radius: 50%;

    z-index: 6;

    pointer-events: none;

    background:
        radial-gradient(
            circle at center,

            #000 0%,
            #000 31%,

            rgba(0,0,0,0.98) 40%,

            rgba(5,6,9,0.98) 47%,

            rgba(255,255,255,0.12) 53%,

            rgba(150,170,200,0.10) 58%,

            rgba(70,90,120,0.06) 65%,

            transparent 74%
        );

    box-shadow:

        0 0 18px
        rgba(255,255,255,0.07),

        0 0 45px
        rgba(150,170,200,0.09),

        0 0 100px
        rgba(100,130,170,0.07);

    will-change:
        transform,
        filter;

    animation:
        blackHoleRotate
        24s
        linear
        infinite;

}


/* =========================================================
   VERY SLOW ROTATION
   ========================================================= */

@keyframes blackHoleRotate {

    from {

        transform:
            translate3d(-50%, -50%, 0)
            rotate(0deg)
            scale(1);

    }

    to {

        transform:
            translate3d(-50%, -50%, 0)
            rotate(360deg)
            scale(1);

    }

}


/* =========================================================
   CAMERA FLIGHT
   ========================================================= */

.cinematic-intro.camera-flight
.intro-scene {

    animation:
        smoothCameraFlight
        3.15s
        cubic-bezier(
            0.12,
            0.82,
            0.18,
            1
        )
        forwards !important;

    transform-origin:
        50% 22%;

    will-change:
        transform,
        filter;

}


/* =========================================================
   CONTINUOUS CAMERA MOVEMENT
   ========================================================= */

@keyframes smoothCameraFlight {

    0% {

        transform:
            translate3d(0,0,0)
            scale(1.03);

        filter:
            brightness(1)
            contrast(1);

    }

    10% {

        transform:
            translate3d(0,0,0)
            scale(1.045);

        filter:
            brightness(1.002)
            contrast(1.002);

    }

    20% {

        transform:
            translate3d(0,0,0)
            scale(1.075);

        filter:
            brightness(1.005)
            contrast(1.005);

    }

    30% {

        transform:
            translate3d(0,0,0)
            scale(1.13);

        filter:
            brightness(1.008)
            contrast(1.006);

    }

    40% {

        transform:
            translate3d(0,0,0)
            scale(1.23);

        filter:
            brightness(1.012)
            contrast(1.01);

    }

    50% {

        transform:
            translate3d(0,0,0)
            scale(1.39);

        filter:
            brightness(1.018)
            contrast(1.015);

    }

    60% {

        transform:
            translate3d(0,0,0)
            scale(1.64);

        filter:
            brightness(1.025)
            contrast(1.02);

    }

    70% {

        transform:
            translate3d(0,0,0)
            scale(2.05);

        filter:
            brightness(1.035)
            contrast(1.025);

    }

    78% {

        transform:
            translate3d(0,0,0)
            scale(2.65);

        filter:
            brightness(1.045)
            contrast(1.035);

    }

    86% {

        transform:
            translate3d(0,0,0)
            scale(3.55);

        filter:
            brightness(1.06)
            contrast(1.045);

    }

    93% {

        transform:
            translate3d(0,0,0)
            scale(5.15);

        filter:
            brightness(1.08)
            contrast(1.055);

    }

    100% {

        transform:
            translate3d(0,0,0)
            scale(7.8);

        filter:
            brightness(1.10)
            contrast(1.06);

    }

}


/* =========================================================
   BLACK HOLE EXPANSION
   ========================================================= */

.cinematic-intro.black-hole-exit
.intro-black-hole {

    animation:
        blackHoleSmoothExpansion
        3.0s
        cubic-bezier(
            0.18,
            0.78,
            0.16,
            1
        )
        forwards !important;

}


/* =========================================================
   CONTINUOUS BLACK HOLE GROWTH
   ========================================================= */

@keyframes blackHoleSmoothExpansion {

    0% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(1);

        filter:
            brightness(1);

    }

    15% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(1.05);

        filter:
            brightness(1.005);

    }

    30% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(1.25);

        filter:
            brightness(1.01);

    }

    45% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(1.8);

        filter:
            brightness(1.015);

    }

    58% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(2.9);

        filter:
            brightness(1.02);

    }

    68% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(4.8);

        filter:
            brightness(1.025);

    }

    77% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(7.5);

        filter:
            brightness(1.03);

    }

    86% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(12);

        filter:
            brightness(1.035);

    }

    94% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(22);

        filter:
            brightness(1.04);

    }

    100% {

        transform:
            translate3d(-50%, -50%, 0)
            scale(42);

        filter:
            brightness(1.045);

    }

}


/* =========================================================
   TEXT DISAPPEAR
   ========================================================= */

.cinematic-intro.camera-flight
.intro-content {

    animation:
        smoothTextExit
        0.85s
        cubic-bezier(
            0.22,
            0.61,
            0.36,
            1
        )
        forwards !important;

}


@keyframes smoothTextExit {

    0% {

        opacity: 1;

        transform:
            translate3d(-50%, -50%, 0)
            scale(1);

        filter:
            blur(0);

    }

    40% {

        opacity: 0.7;

        transform:
            translate3d(-50%, -50%, 0)
            scale(0.995);

        filter:
            blur(0.3px);

    }

    70% {

        opacity: 0.25;

        transform:
            translate3d(-50%, -50%, 0)
            scale(0.985);

        filter:
            blur(1px);

    }

    100% {

        opacity: 0;

        transform:
            translate3d(-50%, -50%, 0)
            scale(0.97);

        filter:
            blur(2px);

    }

}


/* =========================================================
   FINAL BLACK
   ========================================================= */

.cinematic-intro.final-black {

    background:
        #000 !important;

}


.cinematic-intro.final-black::after {

    content: "";

    position: absolute;

    inset: 0;

    z-index: 99999;

    background: #000;

    opacity: 1;

    pointer-events: none;

}


/* =========================================================
   HOMEPAGE
   ========================================================= */

body.intro-revealed
.navbar,

body.intro-revealed
.hero,

body.intro-revealed
.section,

body.intro-revealed
.final-cta,

body.intro-revealed
footer {

    visibility: visible !important;

}

`;


document.head.appendChild(
    cinematicStyle
);


/* =========================================================
   ENTER GLOW
   ========================================================= */

enterGlow.addEventListener(
    "click",
    () => {

        if (
            introStarted ||
            introFinished
        ) {
            return;
        }


        introStarted = true;


        document.body.classList.add(
            "intro-playing"
        );


        /*
         * Start both animations together.
         *
         * The easing curves are deliberately
         * long and continuous.
         */

        cinematicIntro.classList.add(
            "camera-flight"
        );


        cinematicIntro.classList.add(
            "black-hole-exit"
        );


        /*
         * Keep black hole visible until
         * the camera reaches it.
         */


        /* -----------------------------------------
           PURE BLACK
           ----------------------------------------- */

        setTimeout(
            () => {

                cinematicIntro.classList.add(
                    "final-black"
                );

            },
            2920
        );


        /* -----------------------------------------
           HOMEPAGE
           ----------------------------------------- */

        setTimeout(
            () => {

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

            },
            3150
        );

    }
);


/* =========================================================
   SKIP INTRO
   ========================================================= */

skipIntro.addEventListener(
    "click",
    () => {

        if (introFinished) {
            return;
        }


        introFinished = true;
        introStarted = true;


        cinematicIntro.classList.remove(
            "camera-flight",
            "black-hole-exit",
            "final-black"
        );


        cinematicIntro.style.animation =
            "none";

        cinematicIntro.style.transition =
            "none";


        cinematicIntro.style.opacity =
            "0";

        cinematicIntro.style.visibility =
            "hidden";

        cinematicIntro.style.pointerEvents =
            "none";

        cinematicIntro.style.display =
            "none";


        document.body.classList.remove(
            "intro-playing"
        );


        document.body.classList.add(
            "intro-revealed"
        );


        unlockPage();

    }
);


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
