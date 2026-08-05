/* =========================================================
   GLOW — SCRIPT
   ========================================================= */


/* =========================================================
   CINEMATIC INTRO — PAGE LOCK
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
   CINEMATIC INTRO STATE
   ========================================================= */

let introStarted = false;
let introFinished = false;
let introFrame = null;


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
   CREATE FINAL BLACK SCREEN
   ========================================================= */

let finalBlackScreen =
    cinematicIntro.querySelector(
        ".cinematic-black-screen"
    );


if (!finalBlackScreen) {

    finalBlackScreen =
        document.createElement("div");

    finalBlackScreen.className =
        "cinematic-black-screen";

    cinematicIntro.appendChild(
        finalBlackScreen
    );

}


/* =========================================================
   CINEMATIC INTRO STYLE
   ========================================================= */

const cinematicStyle =
    document.createElement("style");

cinematicStyle.textContent = `

/* =========================================================
   CINEMATIC INTRO OVERRIDES
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

    transform:
        translate3d(0, 0, 0)
        scale(1.03);

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
        scale(1);

    border-radius: 50%;

    background:
        radial-gradient(
            circle,

            #000000 0%,
            #000000 31%,

            rgba(0,0,0,0.98) 40%,

            rgba(3,4,7,0.98) 46%,

            rgba(255,255,255,0.15) 52%,

            rgba(170,190,220,0.11) 57%,

            rgba(90,120,165,0.07) 65%,

            transparent 76%
        );

    box-shadow:

        0 0 18px
        rgba(255,255,255,0.08),

        0 0 50px
        rgba(145,170,205,0.12),

        0 0 110px
        rgba(90,120,165,0.10),

        0 0 180px
        rgba(60,90,130,0.06);

    pointer-events: none;

    z-index: 7;

    will-change:
        transform,
        filter,
        opacity;

}


/* =========================================================
   BLACK HOLE INNER ROTATING RING
   ========================================================= */

.cinematic-intro .intro-black-hole::before {

    content: "";

    position: absolute;

    left: 50%;
    top: 50%;

    width: 82%;
    height: 82%;

    transform:
        translate(-50%, -50%);

    border-radius: 50%;

    background:
        conic-gradient(
            from 0deg,

            transparent 0deg,

            rgba(255,255,255,0.025) 30deg,

            rgba(200,215,235,0.14) 70deg,

            rgba(255,255,255,0.025) 110deg,

            transparent 145deg,

            transparent 190deg,

            rgba(190,210,235,0.10) 230deg,

            rgba(255,255,255,0.02) 270deg,

            transparent 315deg,

            transparent 360deg
        );

    filter:
        blur(4px);

    opacity: 0.75;

}


/* =========================================================
   BLACK HOLE OUTER RING
   ========================================================= */

.cinematic-intro .intro-black-hole::after {

    content: "";

    position: absolute;

    left: 50%;
    top: 50%;

    width: 106%;
    height: 106%;

    transform:
        translate(-50%, -50%);

    border-radius: 50%;

    border:
        1px solid
        rgba(210,225,245,0.075);

    box-shadow:
        0 0 25px
        rgba(150,175,210,0.08);

    opacity: 0.6;

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
   SMOOTH CINEMATIC EASING
   ========================================================= */

function cinematicEase(t) {

    t =
        Math.max(
            0,
            Math.min(1, t)
        );

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
   CAMERA CURVE
   ========================================================= */

function cameraCurve(t) {

    t =
        Math.max(
            0,
            Math.min(1, t)
        );


    /*
       First part:
       very slow and deliberate.

       Middle:
       camera begins gaining momentum.

       Final:
       powerful acceleration.
    */

    if (t < 0.18) {

        const p =
            t / 0.18;

        return (
            p *
            p *
            0.055
        );

    }


    if (t < 0.55) {

        const p =
            (t - 0.18) /
            0.37;

        return (
            0.055 +
            cinematicEase(p) *
            0.23
        );

    }


    if (t < 0.82) {

        const p =
            (t - 0.55) /
            0.27;

        return (
            0.285 +
            cinematicEase(p) *
            0.36
        );

    }


    const p =
        (t - 0.82) /
        0.18;

    return (
        0.645 +
        cinematicEase(p) *
        0.355
    );

}


/* =========================================================
   CAMERA SCALE
   ========================================================= */

function getCameraScale(progress) {

    const start =
        1.03;

    const end =
        7.6;


    return (
        start *
        Math.pow(
            end / start,
            progress
        )
    );

}


/* =========================================================
   BLACK HOLE EXPANSION
   ========================================================= */

function getBlackHoleScale(t) {

    /*
       The black hole remains almost unchanged
       during the first part of the camera flight.

       Only once the camera is genuinely close
       does the event horizon begin dominating
       the frame.
    */

    if (t < 0.68) {

        return 1;

    }


    const local =
        (t - 0.68) /
        0.32;


    const eased =
        cinematicEase(
            local
        );


    /*
       Only a controlled final enlargement.

       This is intentionally much smaller than
       the previous 35x / 48x expansion.
    */

    return (
        1 +
        eased * 7.5
    );

}


/* =========================================================
   CAMERA BRIGHTNESS
   ========================================================= */

function getBrightness(progress) {

    return (
        1 +
        progress * 0.055
    );

}


/* =========================================================
   CAMERA CONTRAST
   ========================================================= */

function getContrast(progress) {

    return (
        1 +
        progress * 0.035
    );

}


/* =========================================================
   START CINEMATIC TRANSITION
   ========================================================= */

function startCinematicTransition() {

    if (introFinished) {
        return;
    }


    if (introFrame) {

        cancelAnimationFrame(
            introFrame
        );

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
       Deliberate cinematic duration.
    */

    const duration =
        3900;


    /*
       Very short final black.
    */

    const blackDuration =
        340;


    cinematicIntro.classList.add(
        "camera-flight"
    );


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
                    elapsed / duration
                )
            );


        /* -----------------------------------------
           CAMERA
           ----------------------------------------- */

        const progress =
            cameraCurve(raw);


        const cameraScale =
            getCameraScale(
                progress
            );


        scene.style.transform =
            `
            translate3d(0,0,0)
            scale(${cameraScale})
            `;


        scene.style.filter =
            `
            brightness(
                ${getBrightness(progress)}
            )
            contrast(
                ${getContrast(progress)}
            )
            `;


        /* -----------------------------------------
           BLACK HOLE
           ----------------------------------------- */

        const holeScale =
            getBlackHoleScale(
                raw
            );


        /*
           Very slow axial rotation.

           Importantly:
           no x/y movement.
        */

        const rotation =
            elapsed *
            0.009;


        introBlackHole.style.transform =
            `
            translate3d(-50%,-50%,0)
            scale(${holeScale})
            rotate(${rotation}deg)
            `;


        /*
           Very subtle increase in intensity.
        */

        introBlackHole.style.filter =
            `
            brightness(
                ${1 + raw * 0.12}
            )
            `;


        /* -----------------------------------------
           TEXT
           ----------------------------------------- */

        let textOpacity = 1;

        let textScale = 1;

        let textBlur = 0;


        /*
           Text disappears during the first
           part of the shot.

           The camera does NOT immediately
           accelerate.
        */

        if (raw < 0.20) {

            const p =
                raw / 0.20;


            const e =
                cinematicEase(p);


            textOpacity =
                1 - e;


            textScale =
                1 -
                e * 0.025;


            textBlur =
                e * 1.8;

        }
        else {

            textOpacity = 0;

            textScale = 0.975;

            textBlur = 1.8;

        }


        content.style.opacity =
            textOpacity;


        content.style.transform =
            `
            translate3d(-50%,-50%,0)
            scale(${textScale})
            `;


        content.style.filter =
            `
            blur(${textBlur}px)
            `;


        /* -----------------------------------------
           FINAL BLACK
           ----------------------------------------- */

        /*
           The black screen begins very late,
           when the black hole is already
           dominating the frame.
        */

        if (raw > 0.955) {

            const p =
                (
                    raw -
                    0.955
                ) /
                0.045;


            finalBlackScreen.style.opacity =
                Math.min(
                    1,
                    p
                );

        }
        else {

            finalBlackScreen.style.opacity =
                0;

        }


        /* -----------------------------------------
           FINISH
           ----------------------------------------- */

        if (elapsed >= duration) {

            finalBlackScreen.style.opacity =
                1;


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


    introFinished = true;


    if (introFrame) {

        cancelAnimationFrame(
            introFrame
        );

        introFrame = null;

    }


    finalBlackScreen.style.opacity =
        1;


    cinematicIntro.style.display =
        "none";


    document.body.classList.remove(
        "intro-playing"
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


        startCinematicTransition();

    }
);


/* =========================================================
   SKIP INTRO
   ========================================================= */

skipIntro.addEventListener(
    "click",
    () => {

        /*
           Skip works before OR during
           the cinematic transition.
        */

        if (introFinished) {
            return;
        }


        introStarted = true;
        introFinished = true;


        if (introFrame) {

            cancelAnimationFrame(
                introFrame
            );

            introFrame = null;

        }


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
    document.querySelectorAll(
        "#sliderDots button"
    );


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

    const image =
        new Image();

    image.src =
        slide.image;

});


function showSlide(index) {

    currentSlide =
        (index + slides.length) %
        slides.length;


    const slide =
        slides[currentSlide];


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


    sliderDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );


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


/* Dot navigation */

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


/* Start slideshow */

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


/* Open search */

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


/* Close search */

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


/* Close search with Escape */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
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
   ADD REVEAL STYLES
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
