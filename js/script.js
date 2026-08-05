/* =========================================================
   GLOW — SCRIPT
   ========================================================= */


/* =========================================================
   CINEMATIC INTRO — PAGE LOCK
   ========================================================= */

document.documentElement.classList.add("intro-active");
document.body.classList.add("intro-active");


/* =========================================================
   CINEMATIC INTRO
   ========================================================= */

const cinematicIntro =
    document.getElementById("cinematicIntro");

const enterGlow =
    document.getElementById("enterGlow");

const skipIntro =
    document.getElementById("skipIntro");


/* =========================================================
   CINEMATIC INTRO STATE
   ========================================================= */

let introStarted = false;
let introFinished = false;
let cinematicFrame = null;


/* =========================================================
   UNLOCK PAGE
   ========================================================= */

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
   CINEMATIC INTRO STYLE
   ========================================================= */

const cinematicStyle =
    document.createElement("style");


cinematicStyle.textContent = `

/* =========================================================
   CINEMATIC INTRO
   ========================================================= */

.cinematic-intro {

    position: fixed;

    inset: 0;

    z-index: 9999;

    overflow: hidden;

    background: #020305;

}


/* =========================================================
   INTRO SCENE
   ========================================================= */

.cinematic-intro .intro-scene {

    transform-origin: 50% 22%;

    will-change:
        transform,
        filter;

}


/* =========================================================
   BLACK HOLE
   ========================================================= */

.cinematic-intro .intro-black-hole {

    position: absolute;

    left: 50%;
    top: 22%;

    width: min(16vw, 175px);
    height: min(16vw, 175px);

    transform:
        translate3d(-50%, -50%, 0)
        scale(1)
        rotate(0deg);

    border-radius: 50%;

    pointer-events: none;

    z-index: 7;

    background:
        radial-gradient(
            circle at center,

            #000000 0%,
            #000000 30%,

            rgba(0,0,0,0.98) 39%,

            rgba(4,5,8,0.98) 46%,

            rgba(255,255,255,0.14) 52%,

            rgba(155,175,205,0.11) 57%,

            rgba(80,105,145,0.07) 64%,

            transparent 74%
        );

    box-shadow:

        0 0 18px
        rgba(255,255,255,0.08),

        0 0 45px
        rgba(150,175,210,0.11),

        0 0 100px
        rgba(90,120,165,0.09),

        0 0 180px
        rgba(60,90,130,0.06);

    will-change:
        transform,
        filter;

}


/* =========================================================
   BLACK HOLE INNER ACCRETION RING
   ========================================================= */

.cinematic-intro .intro-black-hole::before {

    content: "";

    position: absolute;

    left: 50%;
    top: 50%;

    width: 78%;
    height: 78%;

    transform:
        translate(-50%, -50%)
        rotate(0deg);

    border-radius: 50%;

    background:
        conic-gradient(
            from 0deg,

            transparent 0deg,

            rgba(255,255,255,0.02) 35deg,

            rgba(190,205,225,0.12) 75deg,

            transparent 115deg,

            transparent 180deg,

            rgba(255,255,255,0.10) 230deg,

            transparent 285deg,

            transparent 360deg
        );

    filter:
        blur(4px);

    opacity: 0.8;

}


/* =========================================================
   BLACK HOLE OUTER RING
   ========================================================= */

.cinematic-intro .intro-black-hole::after {

    content: "";

    position: absolute;

    left: 50%;
    top: 50%;

    width: 105%;
    height: 105%;

    transform:
        translate(-50%, -50%)
        rotate(0deg);

    border-radius: 50%;

    border:
        1px solid
        rgba(210,225,245,0.08);

    box-shadow:
        0 0 25px
        rgba(150,175,210,0.08);

    opacity: 0.65;

}


/* =========================================================
   INTRO CONTENT
   ========================================================= */

.cinematic-intro .intro-content {

    will-change:
        opacity,
        transform,
        filter;

}


/* =========================================================
   CAMERA FLIGHT STATE
   ========================================================= */

.cinematic-intro.camera-flight {

    pointer-events: none;

}


/* =========================================================
   FINAL BLACK SCREEN
   ========================================================= */

.cinematic-intro .cinematic-black-screen {

    position: absolute;

    inset: 0;

    z-index: 99999;

    background: #000000;

    opacity: 0;

    pointer-events: none;

    will-change: opacity;

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


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 650px) {

    .cinematic-intro .intro-black-hole {

        width: 100px;
        height: 100px;

        left: 50%;
        top: 22%;

    }

}

`;


document.head.appendChild(
    cinematicStyle
);


/* =========================================================
   CREATE FINAL BLACK SCREEN
   ========================================================= */

let cinematicBlackScreen =
    cinematicIntro.querySelector(
        ".cinematic-black-screen"
    );


if (!cinematicBlackScreen) {

    cinematicBlackScreen =
        document.createElement("div");

    cinematicBlackScreen.className =
        "cinematic-black-screen";

    cinematicIntro.appendChild(
        cinematicBlackScreen
    );

}


/* =========================================================
   CINEMATIC MATH
   ========================================================= */

/*
   This is deliberately NOT a normal CSS ease curve.

   The camera starts extremely gently,
   gradually builds momentum,
   and becomes powerful near the black hole.

   This avoids the visible:
       zoom → pause → zoom → pause
   feeling.
*/


function cinematicEase(t) {

    t = Math.max(
        0,
        Math.min(1, t)
    );


    /*
       Smooth acceleration.

       Zero velocity at the beginning,
       continuous acceleration,
       continuous deceleration
       toward the final frame.
    */

    return (
        t * t * t *
        (
            t * (
                t * 6 - 15
            ) + 10
        )
    );

}


/* =========================================================
   CAMERA PROGRESS
   ========================================================= */

function cameraProgress(t) {

    t = Math.max(
        0,
        Math.min(1, t)
    );


    /*
       Very subtle beginning.
       Strong acceleration toward the end.
    */

    const smooth =
        t * t * (
            3 - 2 * t
        );


    const cinematic =
        Math.pow(
            smooth,
            0.72
        );


    return cinematic;

}


/* =========================================================
   BLACK HOLE PROGRESS
   ========================================================= */

function blackHoleProgress(t) {

    t = Math.max(
        0,
        Math.min(1, t)
    );


    /*
       The black hole stays almost normal
       while the camera approaches.

       It begins expanding only when
       the camera is close enough.
    */

    const start = 0.64;

    if (t <= start) {
        return 0;
    }


    const local =
        (t - start) /
        (1 - start);


    return (
        local *
        local *
        local *
        (
            local *
            (
                local * 6 - 15
            ) + 10
        )
    );

}


/* =========================================================
   BLACK HOLE SCALE
   ========================================================= */

function getBlackHoleScale(progress) {

    /*
       Start:
           1

       End:
           enormous

       Exponential growth gives the feeling
       that the camera is actually entering it,
       rather than simply enlarging a circle.
    */

    const startScale = 1;

    const endScale = 48;


    return (
        startScale *
        Math.pow(
            endScale / startScale,
            progress
        )
    );

}


/* =========================================================
   CAMERA SCALE
   ========================================================= */

function getCameraScale(progress) {

    /*
       Camera begins at 1.03.

       Final value is large enough that
       the black hole completely dominates
       the frame.
    */

    const startScale =
        1.03;

    const endScale =
        8.4;


    return (
        startScale *
        Math.pow(
            endScale / startScale,
            progress
        )
    );

}


/* =========================================================
   CAMERA BRIGHTNESS
   ========================================================= */

function getCameraBrightness(progress) {

    /*
       Very subtle brightness increase.

       This prevents the image from looking
       like a normal CSS zoom.
    */

    return (
        1 +
        progress * 0.075
    );

}


/* =========================================================
   CAMERA CONTRAST
   ========================================================= */

function getCameraContrast(progress) {

    return (
        1 +
        progress * 0.045
    );

}


/* =========================================================
   START CINEMATIC CAMERA
   ========================================================= */

function startCinematicCamera() {

    if (cinematicFrame) {

        cancelAnimationFrame(
            cinematicFrame
        );

        cinematicFrame = null;

    }


    const scene =
        cinematicIntro.querySelector(
            ".intro-scene"
        );


    const content =
        cinematicIntro.querySelector(
            ".intro-content"
        );


    const startTime =
        performance.now();


    /*
       Total cinematic movement.

       Long enough to feel deliberate,
       short enough to remain cinematic.
    */

    const CAMERA_DURATION =
        3850;


    /*
       Black screen is intentionally
       very short.
    */

    const BLACK_SCREEN_DURATION =
        280;


    let blackStarted = false;


    cinematicIntro.classList.add(
        "camera-flight"
    );


    function animateCamera(now) {

        if (introFinished) {
            return;
        }


        const elapsed =
            now - startTime;


        let rawProgress =
            elapsed /
            CAMERA_DURATION;


        rawProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    rawProgress
                )
            );


        /*
           Main cinematic camera curve.
        */

        const progress =
            cameraProgress(
                rawProgress
            );


        /* -----------------------------------------
           CAMERA
           ----------------------------------------- */

        const cameraScale =
            getCameraScale(
                progress
            );


        const brightness =
            getCameraBrightness(
                progress
            );


        const contrast =
            getCameraContrast(
                progress
            );


        scene.style.transform =
            `
            translate3d(0, 0, 0)
            scale(${cameraScale})
            `;


        scene.style.filter =
            `
            brightness(${brightness})
            contrast(${contrast})
            `;


        /* -----------------------------------------
           BLACK HOLE
           ----------------------------------------- */

        const holeProgress =
            blackHoleProgress(
                rawProgress
            );


        const holeScale =
            getBlackHoleScale(
                holeProgress
            );


        /*
           Slow continuous rotation.

           The black hole stays fixed in the sky.
           Only its axis rotates.
        */

        const rotation =
            elapsed * 0.012;


        introBlackHole.style.transform =
            `
            translate3d(-50%, -50%, 0)
            scale(${holeScale})
            rotate(${rotation}deg)
            `;


        /*
           Make the black hole slightly
           more intense as the camera approaches.
        */

        introBlackHole.style.filter =
            `
            brightness(
                ${1 + holeProgress * 0.12}
            )
            `;


        /* -----------------------------------------
           TEXT
           ----------------------------------------- */

        /*
           Text disappears BEFORE the
           camera really accelerates.
        */

        let textOpacity = 1;


        if (rawProgress < 0.18) {

            const textProgress =
                rawProgress /
                0.18;


            const easedText =
                textProgress *
                textProgress *
                (
                    3 -
                    2 *
                    textProgress
                );


            textOpacity =
                1 -
                easedText;

        }
        else {

            textOpacity = 0;

        }


        /*
           Very slight cinematic pullback
           before disappearing.
        */

        const textScale =
            1 -
            Math.min(
                0.025,
                rawProgress * 0.04
            );


        const textBlur =
            Math.min(
                2,
                rawProgress * 8
            );


        content.style.opacity =
            textOpacity;


        content.style.transform =
            `
            translate3d(-50%, -50%, 0)
            scale(${textScale})
            `;


        content.style.filter =
            `
            blur(${textBlur}px)
            `;


        /* -----------------------------------------
           BLACK SCREEN
           ----------------------------------------- */

        if (
            rawProgress >= 0.93 &&
            !blackStarted
        ) {

            blackStarted = true;

        }


        if (blackStarted) {

            const blackProgress =
                (
                    rawProgress -
                    0.93
                ) /
                0.07;


            const blackOpacity =
                Math.min(
                    1,
                    blackProgress
                );


            cinematicBlackScreen.style.opacity =
                blackOpacity;

        }


        /* -----------------------------------------
           FINISH
           ----------------------------------------- */

        if (
            elapsed >= CAMERA_DURATION
        ) {

            cinematicBlackScreen.style.opacity =
                "1";


            setTimeout(
                () => {

                    if (introFinished) {
                        return;
                    }


                    finishCinematicIntro();

                },
                BLACK_SCREEN_DURATION
            );


            return;

        }


        cinematicFrame =
            requestAnimationFrame(
                animateCamera
            );

    }


    cinematicFrame =
        requestAnimationFrame(
            animateCamera
        );

}


/* =========================================================
   FINISH CINEMATIC INTRO
   ========================================================= */

function finishCinematicIntro() {

    if (introFinished) {
        return;
    }


    introFinished = true;


    if (cinematicFrame) {

        cancelAnimationFrame(
            cinematicFrame
        );

        cinematicFrame = null;

    }


    cinematicBlackScreen.style.opacity =
        "1";


    /*
       Hide cinematic intro.
    */

    cinematicIntro.style.display =
        "none";


    /*
       Reveal homepage.
    */

    document.body.classList.remove(
        "intro-playing"
    );


    document.body.classList.add(
        "intro-revealed"
    );


    unlockPage();

}


/* =========================================================
   ENTER GLOW
   ========================================================= */

enterGlow.addEventListener(
    "click",
    () => {

        if (introStarted) {
            return;
        }


        introStarted = true;


        document.body.classList.add(
            "intro-playing"
        );


        /*
           Start the cinematic camera.
        */

        startCinematicCamera();

    }
);


/* =========================================================
   SKIP INTRO
   ========================================================= */

skipIntro.addEventListener(
    "click",
    () => {

        /*
           Skip must work even if the
           cinematic animation has already
           started.
        */

        if (introFinished) {
            return;
        }


        introStarted = true;
        introFinished = true;


        /*
           Stop RAF animation.
        */

        if (cinematicFrame) {

            cancelAnimationFrame(
                cinematicFrame
            );

            cinematicFrame = null;

        }


        /*
           Completely remove cinematic
           animation state.
        */

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


        /*
           Show homepage immediately.
        */

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
        description: "Experience Minecraft skies like never before.",
        image: "red-sprites-hero.png"
    },
    {
        title: "Aurora",
        description: "Bring atmospheric skies and immersive light to your world.",
        image: "aurora-hero.png"
    },
    {
        title: "Cinematic",
        description: "Experience beautiful lighting and breathtaking Minecraft worlds.",
        image: "sunset-hero.png"
    }
];

let currentSlide = 0;
let slideTimer;

const heroBackground =
    document.querySelector(".hero-background");

const heroTitle =
    document.getElementById("heroTitle");

const heroDescription =
    document.getElementById("heroDescription");

const sliderDots =
    document.querySelectorAll("#sliderDots button");


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


/* Preload images */

slides.forEach(slide => {

    const image = new Image();

    image.src = slide.image;

});


function showSlide(index) {

    currentSlide =
        (index + slides.length) % slides.length;

    const slide = slides[currentSlide];


    /* Fade everything */

    heroTitle.style.opacity = "0";
    heroDescription.style.opacity = "0";
    heroBackground.style.opacity = "0";


    setTimeout(() => {

        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;

        setHeroImage(slide.image);

        heroTitle.style.opacity = "1";
        heroDescription.style.opacity = "1";
        heroBackground.style.opacity = "1";

    }, 350);


    /* Update dots */

    sliderDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    /* Restart automatic slideshow */

    clearTimeout(slideTimer);

    slideTimer = setTimeout(() => {

        showSlide(currentSlide + 1);

    }, 4000);

}


/* Dot navigation */

sliderDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});


/* Start slideshow */

setHeroImage(slides[0].image);

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


/* Open search */

searchButton.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    setTimeout(() => {

        searchInput.focus();

    }, 300);

});


/* Close search */

closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

    searchInput.value = "";
    searchResults.innerHTML = "";

});


/* Close search with Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        searchOverlay.classList.remove("active");

        searchInput.value = "";
        searchResults.innerHTML = "";

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

            entries.forEach(entry => {

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

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal"
    );

    revealObserver.observe(
        element
    );

});


/* =========================================================
   ADD REVEAL STYLES
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
   PREVENT EMPTY HASH LINKS FROM JUMPING
   ========================================================= */

document
    .querySelectorAll(
        'a[href="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });
