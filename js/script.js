/* =========================================================
   GLOW — CINEMATIC INTRO
   ========================================================= */

/* =========================================================
   LOCK PAGE DURING INTRO
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

let introStarted = false;
let introFinished = false;
let introFrame = null;

let finalBlackScreen = null;
let introBlackHole = null;


/* =========================================================
   PAGE UNLOCK
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
   CREATE CINEMATIC BLACK HOLE
   ========================================================= */

/*
   The black hole is created here instead of requiring
   another HTML element.

   This means you do NOT need to manually add a black-hole
   element to index.html.
*/

function createCinematicBlackHole() {

    if (!cinematicIntro) {
        return;
    }

    /* Prevent duplicate creation */

    const existing =
        cinematicIntro.querySelector(
            ".cinematic-black-hole"
        );

    if (existing) {

        introBlackHole =
            existing;

        finalBlackScreen =
            cinematicIntro.querySelector(
                ".cinematic-final-black"
            );

        return;

    }


    /* =====================================================
       BLACK HOLE
       ===================================================== */

    introBlackHole =
        document.createElement("div");

    introBlackHole.className =
        "cinematic-black-hole";


    /* =====================================================
       EVENT HORIZON
       ===================================================== */

    const eventHorizon =
        document.createElement("div");

    eventHorizon.className =
        "black-hole-core";


    /* =====================================================
       INNER RING
       ===================================================== */

    const innerRing =
        document.createElement("div");

    innerRing.className =
        "black-hole-ring black-hole-ring-inner";


    /* =====================================================
       OUTER RING
       ===================================================== */

    const outerRing =
        document.createElement("div");

    outerRing.className =
        "black-hole-ring black-hole-ring-outer";


    /* =====================================================
       OUTER GLOW
       ===================================================== */

    const outerGlow =
        document.createElement("div");

    outerGlow.className =
        "black-hole-glow";


    /* =====================================================
       BUILD BLACK HOLE
       ===================================================== */

    introBlackHole.appendChild(
        outerGlow
    );

    introBlackHole.appendChild(
        outerRing
    );

    introBlackHole.appendChild(
        innerRing
    );

    introBlackHole.appendChild(
        eventHorizon
    );


    cinematicIntro.appendChild(
        introBlackHole
    );


    /* =====================================================
       FINAL BLACK SCREEN
       ===================================================== */

    finalBlackScreen =
        document.createElement("div");

    finalBlackScreen.className =
        "cinematic-final-black";

    cinematicIntro.appendChild(
        finalBlackScreen
    );


    /* =====================================================
       CINEMATIC CSS
       ===================================================== */

    const cinematicStyle =
        document.createElement("style");

    cinematicStyle.id =
        "glow-cinematic-style";


    cinematicStyle.textContent = `

        /* =================================================
           BLACK HOLE CONTAINER
           ================================================= */

        .cinematic-black-hole {

            position: absolute;

            left: 50%;
            top: 22%;

            width: 150px;
            height: 150px;

            transform:
                translate3d(-50%, -50%, 0)
                scale(1);

            transform-origin: center center;

            border-radius: 50%;

            z-index: 15;

            pointer-events: none;

            will-change:
                transform,
                filter,
                opacity;

            isolation: isolate;

        }


        /* =================================================
           BLACK HOLE CORE
           ================================================= */

        .black-hole-core {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 42%;
            height: 42%;

            transform:
                translate3d(-50%, -50%, 0);

            border-radius: 50%;

            background:
                #000;

            box-shadow:

                0 0 18px
                rgba(0,0,0,1),

                0 0 35px
                rgba(0,0,0,0.98),

                0 0 65px
                rgba(0,0,0,0.9);

            z-index: 5;

        }


        /* =================================================
           OUTER GLOW
           ================================================= */

        .black-hole-glow {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 100%;
            height: 100%;

            transform:
                translate3d(-50%, -50%, 0);

            border-radius: 50%;

            background:

                radial-gradient(
                    ellipse at center,

                    rgba(255,255,255,0.04)
                    0%,

                    rgba(120,150,190,0.08)
                    25%,

                    rgba(180,190,205,0.07)
                    38%,

                    rgba(80,100,130,0.04)
                    55%,

                    transparent
                    72%
                );

            filter:
                blur(5px);

            z-index: 1;

        }


        /* =================================================
           ACCRETION RINGS
           ================================================= */

        .black-hole-ring {

            position: absolute;

            left: 50%;
            top: 50%;

            width: 100%;
            height: 42%;

            transform:
                translate3d(-50%, -50%, 0)
                rotateX(68deg);

            border-radius: 50%;

            pointer-events: none;

            z-index: 3;

            will-change:
                transform,
                filter,
                opacity;

        }


        /* =================================================
           INNER RING
           ================================================= */

        .black-hole-ring-inner {

            background:

                radial-gradient(
                    ellipse at center,

                    transparent 0%,
                    transparent 29%,

                    rgba(255,255,255,0.04)
                    30%,

                    rgba(255,255,255,0.24)
                    40%,

                    rgba(180,200,225,0.12)
                    49%,

                    rgba(255,255,255,0.04)
                    58%,

                    transparent 70%
                );

            filter:
                blur(1px);

        }


        /* =================================================
           OUTER RING
           ================================================= */

        .black-hole-ring-outer {

            width: 132%;
            height: 52%;

            background:

                radial-gradient(
                    ellipse at center,

                    transparent 0%,
                    transparent 38%,

                    rgba(120,150,190,0.03)
                    43%,

                    rgba(210,220,235,0.11)
                    50%,

                    rgba(130,160,200,0.05)
                    59%,

                    transparent 70%
                );

            filter:
                blur(2px);

        }


        /* =================================================
           FINAL BLACK
           ================================================= */

        .cinematic-final-black {

            position: absolute;

            inset: 0;

            z-index: 100;

            background:
                #000;

            opacity: 0;

            pointer-events: none;

            will-change:
                opacity;

        }


        /* =================================================
           MOBILE
           ================================================= */

        @media (max-width: 650px) {

            .cinematic-black-hole {

                width: 105px;
                height: 105px;

                left: 50%;
                top: 22%;

            }

        }

    `;


    document.head.appendChild(
        cinematicStyle
    );

}


/* =========================================================
   CINEMATIC EASING
   ========================================================= */

/*
   Quintic smoothstep.

   Unlike multiple keyframe acceleration points,
   this produces one continuous acceleration curve.

   That removes the "zoom → tiny stop → zoom again"
   feeling.
*/

function cinematicEase(t) {

    t =
        Math.max(
            0,
            Math.min(
                1,
                t
            )
        );

    return (
        t * t * t *
        (
            t *
            (
                t * 6 - 15
            ) + 10
        )
    );

}


/* =========================================================
   CAMERA EASING
   ========================================================= */

function cameraProgress(t) {

    t =
        Math.max(
            0,
            Math.min(
                1,
                t
            )
        );


    /*
       Slow beginning.

       The camera feels heavy and deliberate.
    */

    if (t < 0.15) {

        const p =
            t / 0.15;

        return (
            cinematicEase(p) *
            0.045
        );

    }


    /*
       Main acceleration.
    */

    if (t < 0.72) {

        const p =
            (
                t - 0.15
            ) / 0.57;

        return (
            0.045 +
            cinematicEase(p) *
            0.58
        );

    }


    /*
       Final approach.

       This is where the camera accelerates
       strongly toward the black hole.
    */

    const p =
        (
            t - 0.72
        ) / 0.28;

    return (
        0.625 +
        cinematicEase(p) *
        0.375
    );

}


/* =========================================================
   CAMERA SCALE
   ========================================================= */

function getCameraScale(progress) {

    const start =
        1.03;

    const end =
        8.5;


    return (
        start *
        Math.pow(
            end / start,
            progress
        )
    );

}


/* =========================================================
   BLACK HOLE SCALE
   ========================================================= */

function getBlackHoleScale(t) {

    /*
       Keep the black hole almost completely stable
       while the camera begins its journey.

       This makes it feel like the camera is actually
       travelling toward a distant object.
    */

    if (t < 0.62) {

        const p =
            t / 0.62;

        return (
            1 +
            cinematicEase(p) *
            0.08
        );

    }


    /*
       The camera has now reached the black hole.

       The event horizon begins consuming the frame.
    */

    const p =
        (
            t - 0.62
        ) / 0.38;


    return (
        1.08 +
        cinematicEase(p) *
        18
    );

}


/* =========================================================
   RING ROTATION
   ========================================================= */

function updateRingRotation(elapsed) {

    const innerRing =
        introBlackHole.querySelector(
            ".black-hole-ring-inner"
        );

    const outerRing =
        introBlackHole.querySelector(
            ".black-hole-ring-outer"
        );


    if (!innerRing || !outerRing) {
        return;
    }


    /*
       Very slow axial rotation.

       No left/right movement.
       No up/down movement.
    */

    const rotation =
        elapsed *
        0.018;


    innerRing.style.transform =
        `
        translate3d(-50%, -50%, 0)
        rotateX(68deg)
        rotateZ(${rotation}deg)
        `;


    outerRing.style.transform =
        `
        translate3d(-50%, -50%, 0)
        rotateX(68deg)
        rotateZ(${-rotation * 0.55}deg)
        `;

}


/* =========================================================
   TEXT FADE
   ========================================================= */

function updateIntroText(rawProgress) {

    const content =
        cinematicIntro.querySelector(
            ".intro-content"
        );


    if (!content) {
        return;
    }


    /*
       Text disappears first.

       No shrinking dramatically.
       No sudden movement.
    */

    const fadeEnd =
        0.16;


    if (rawProgress < fadeEnd) {

        const p =
            rawProgress /
            fadeEnd;

        const eased =
            cinematicEase(p);


        content.style.opacity =
            1 - eased;


        content.style.transform =
            `
            translate3d(
                -50%,
                calc(
                    -50% -
                    ${eased * 8}px
                ),
                0
            )
            scale(
                ${1 - eased * 0.025}
            )
            `;


        content.style.filter =
            `
            blur(
                ${eased * 2}px
            )
            `;

    }

    else {

        content.style.opacity =
            0;

        content.style.transform =
            `
            translate3d(
                -50%,
                -50%,
                0
            )
            scale(0.975)
            `;

        content.style.filter =
            "blur(2px)";

    }

}


/* =========================================================
   START CINEMATIC TRANSITION
   ========================================================= */

function startCinematicTransition() {

    if (
        introStarted === false ||
        introFinished
    ) {
        return;
    }


    createCinematicBlackHole();


    const scene =
        cinematicIntro.querySelector(
            ".intro-scene"
        );


    if (!scene) {
        return;
    }


    const startTime =
        performance.now();


    /*
       Total camera journey.

       Long enough to feel cinematic,
       but not unnecessarily slow.
    */

    const duration =
        3300;


    /*
       Very short black-screen hold.

       This fixes the previous problem where
       the black screen stayed for too long.
    */

    const blackDuration =
        180;


    /*
       Keep the intro alive while the camera moves.
    */

    cinematicIntro.style.display =
        "flex";

    cinematicIntro.style.visibility =
        "visible";

    cinematicIntro.style.opacity =
        "1";

    cinematicIntro.style.pointerEvents =
        "auto";


    /*
       Skip must remain clickable.
    */

    if (skipIntro) {

        skipIntro.style.display =
            "block";

        skipIntro.style.visibility =
            "visible";

        skipIntro.style.opacity =
            "1";

        skipIntro.style.pointerEvents =
            "auto";

        skipIntro.style.zIndex =
            "100000";

    }


    function animate(now) {

        if (introFinished) {
            return;
        }


        const elapsed =
            now -
            startTime;


        const raw =
            Math.max(
                0,
                Math.min(
                    1,
                    elapsed /
                    duration
                )
            );


        /* =================================================
           CAMERA
           ================================================= */

        const progress =
            cameraProgress(
                raw
            );


        const cameraScale =
            getCameraScale(
                progress
            );


        /*
           Critical:

           The transform origin is exactly where the
           black hole exists.

           This makes the zoom feel like the camera is
           actually travelling toward it.
        */

        scene.style.transform =
            `
            translate3d(
                0,
                0,
                0
            )
            scale(
                ${cameraScale}
            )
            `;


        scene.style.transformOrigin =
            "50% 22%";


        /*
           Very subtle cinematic brightness.

           No aggressive brightness flash.
        */

        scene.style.filter =
            `
            brightness(
                ${1 + progress * 0.07}
            )
            contrast(
                ${1 + progress * 0.025}
            )
            `;


        /* =================================================
           BLACK HOLE
           ================================================= */

        const holeScale =
            getBlackHoleScale(
                raw
            );


        /*
           The black hole itself does NOT travel.

           It stays at exactly the same point.

           Only its size changes.
        */

        introBlackHole.style.transform =
            `
            translate3d(
                -50%,
                -50%,
                0
            )
            scale(
                ${holeScale}
            )
            `;


        /*
           Slight intensity increase as we approach.
        */

        introBlackHole.style.filter =
            `
            brightness(
                ${1 + raw * 0.12}
            )
            `;


        /*
           Rotate only the accretion rings.
        */

        updateRingRotation(
            elapsed
        );


        /* =================================================
           TEXT
           ================================================= */

        updateIntroText(
            raw
        );


        /* =================================================
           FINAL BLACK
           ================================================= */

        /*
           Black begins only after the black hole has
           essentially filled the frame.
        */

        if (raw > 0.955) {

            const p =
                (
                    raw -
                    0.955
                ) / 0.045;


            const eased =
                cinematicEase(
                    p
                );


            finalBlackScreen.style.opacity =
                eased;

        }

        else {

            finalBlackScreen.style.opacity =
                0;

        }


        /* =================================================
           FINISH
           ================================================= */

        if (
            elapsed >= duration
        ) {

            finalBlackScreen.style.opacity =
                "1";


            setTimeout(
                () => {

                    finishCinematicTransition();

                },
                blackDuration
            );


            return;

        }


        introFrame =
            requestAnimationFrame(
                animate
            );

    }


    introFrame =
        requestAnimationFrame(
            animate
        );

}


/* =========================================================
   FINISH CINEMATIC TRANSITION
   ========================================================= */

function finishCinematicTransition() {

    if (introFinished) {
        return;
    }


    introFinished =
        true;


    if (introFrame) {

        cancelAnimationFrame(
            introFrame
        );

        introFrame =
            null;

    }


    if (finalBlackScreen) {

        finalBlackScreen.style.opacity =
            "1";

    }


    /*
       Small delay is intentionally handled by the
       previous blackDuration timer.

       Homepage appears after the black frame.
    */

    cinematicIntro.style.display =
        "none";


    cinematicIntro.style.visibility =
        "hidden";


    cinematicIntro.style.opacity =
        "0";


    cinematicIntro.style.pointerEvents =
        "none";


    document.body.classList.remove(
        "intro-playing"
    );


    unlockPage();

}


/* =========================================================
   ENTER GLOW
   ========================================================= */

if (enterGlow) {

    enterGlow.addEventListener(
        "click",
        () => {

            if (introStarted) {
                return;
            }


            introStarted =
                true;


            document.body.classList.add(
                "intro-playing"
            );


            /*
               Create the black hole before
               starting the camera.
            */

            createCinematicBlackHole();


            startCinematicTransition();

        }
    );

}


/* =========================================================
   SKIP INTRO
   ========================================================= */

if (skipIntro) {

    skipIntro.addEventListener(
        "click",
        (event) => {

            /*
               Stop the click from being swallowed by
               the cinematic overlay.
            */

            event.preventDefault();

            event.stopPropagation();


            if (introFinished) {
                return;
            }


            introStarted =
                true;

            introFinished =
                true;


            /* Stop animation frame */

            if (introFrame) {

                cancelAnimationFrame(
                    introFrame
                );

                introFrame =
                    null;

            }


            /*
               Immediately remove cinematic effects.
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
               Unlock homepage.
            */

            document.body.classList.remove(
                "intro-playing"
            );


            unlockPage();

        }
    );

}


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


function setHeroImage(image) {

    heroBackground.style.backgroundImage =
        `
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

slides.forEach(
    slide => {

        const image =
            new Image();

        image.src =
            slide.image;

    }
);


/* =========================================================
   SHOW HERO SLIDE
   ========================================================= */

function showSlide(index) {

    currentSlide =
        (
            index +
            slides.length
        ) %
        slides.length;


    const slide =
        slides[
            currentSlide
        ];


    /*
       Fade everything.
    */

    heroTitle.style.opacity =
        "0";

    heroDescription.style.opacity =
        "0";

    heroBackground.style.opacity =
        "0";


    setTimeout(
        () => {

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

        },
        350
    );


    /* =====================================================
       UPDATE DOTS
       ===================================================== */

    sliderDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );


    /* =====================================================
       RESTART SLIDESHOW
       ===================================================== */

    clearTimeout(
        slideTimer
    );


    slideTimer =
        setTimeout(
            () => {

                showSlide(
                    currentSlide + 1
                );

            },
            4000
        );

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
   START SLIDESHOW
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
    setTimeout(
        () => {

            showSlide(1);

        },
        4000
    );


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


        setTimeout(
            () => {

                searchInput.focus();

            },
            300
        );

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
            results.length === 0
        ) {

            searchResults.innerHTML =
                `
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


                result.innerHTML =
                    `
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
        (
            entries,
            observer
        ) => {

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
            threshold:
                0.12
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
   ADD REVEAL STYLES
   ========================================================= */

const revealStyle =
    document.createElement(
        "style"
    );


revealStyle.textContent =
    `

    .reveal {

        opacity: 0;

        transform:
            translateY(45px)
            scale(0.98);

        transition:

            opacity
            0.9s
            ease,

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
   PREVENT EMPTY HASH LINKS FROM JUMPING
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
