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
let finishTimer = null;


/* =========================================================
   UNLOCK PAGE
   ========================================================= */

function unlockPage() {

    document.documentElement.classList.remove("intro-active");
    document.body.classList.remove("intro-active");

}


/* =========================================================
   BLACK HOLE ELEMENT
   ========================================================= */

let introBlackHole =
    cinematicIntro.querySelector(".intro-black-hole");

if (!introBlackHole) {

    introBlackHole = document.createElement("div");

    introBlackHole.className =
        "intro-black-hole";

    cinematicIntro.appendChild(
        introBlackHole
    );

}


/* =========================================================
   FINAL BLACK SCREEN
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
   CINEMATIC INTRO OVERRIDES
   ========================================================= */

const cinematicStyle =
    document.createElement("style");

cinematicStyle.textContent = `

.cinematic-intro .intro-scene {
    transform-origin: 50% 22%;
    will-change: transform, filter;
}

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

    transform-origin: 50% 50%;

    border-radius: 50%;

    z-index: 7;

    pointer-events: none;

    will-change:
        transform,
        filter;

    animation:
        blackHoleAxisRotation
        22s
        linear
        infinite;
}

.cinematic-intro .intro-black-hole::before {
    animation:
        blackHoleDiskRotation
        13s
        linear
        infinite;
}

.cinematic-intro .cinematic-black-screen {
    position: absolute;

    inset: 0;

    z-index: 99999;

    background: #000;

    opacity: 0;

    pointer-events: none;

    will-change: opacity;
}


@keyframes blackHoleAxisRotation {

    from {
        transform:
            translate3d(-50%, -50%, 0)
            rotate(0deg);
    }

    to {
        transform:
            translate3d(-50%, -50%, 0)
            rotate(360deg);
    }

}


@keyframes blackHoleDiskRotation {

    from {
        transform:
            translate(-50%, -50%)
            rotate(0deg);
    }

    to {
        transform:
            translate(-50%, -50%)
            rotate(360deg);
    }

}


@media (max-width: 650px) {

    .cinematic-intro .intro-black-hole {

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


/* =========================================================
   CINEMATIC EASING
   ========================================================= */

function cinematicEase(t) {

    t = Math.max(
        0,
        Math.min(1, t)
    );

    return (
        t *
        t *
        t *
        (t * (t * 6 - 15) + 10)
    );

}


/* =========================================================
   CAMERA MOTION
   ========================================================= */

function cameraProgress(t) {

    t = Math.max(
        0,
        Math.min(1, t)
    );


    /*
       0.00–0.18
       Text disappears.

       0.18–0.70
       Camera gradually gains speed.

       0.70–1.00
       Long continuous final acceleration.

       There are no separate zoom animations,
       so there is no artificial pause between
       stages.
    */


    if (t <= 0.18) {

        return 0;

    }


    if (t <= 0.70) {

        const p =
            (t - 0.18) / 0.52;

        return (
            cinematicEase(p) *
            0.55
        );

    }


    const p =
        (t - 0.70) / 0.30;

    return (
        0.55 +
        cinematicEase(p) *
        0.45
    );

}


/* =========================================================
   CAMERA SCALE
   ========================================================= */

function getCameraScale(progress) {

    const start = 1.03;
    const end = 7.8;

    /*
       Exponential interpolation gives a
       continuous optical acceleration instead
       of a sequence of visible jumps.
    */

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
       Keep the black hole physically stable
       while the camera approaches.

       Once the camera is close, the event
       horizon expands continuously and takes
       over the entire frame.
    */


    if (t < 0.70) {

        return 1;

    }


    const p =
        (t - 0.70) / 0.30;

    const eased =
        cinematicEase(p);


    const start = 1;
    const end = 24;


    return (
        start *
        Math.pow(
            end / start,
            eased
        )
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

        introFrame = null;

    }


    if (finishTimer) {

        clearTimeout(
            finishTimer
        );

        finishTimer = null;

    }


    const scene =
        cinematicIntro.querySelector(
            ".intro-scene"
        );


    const content =
        cinematicIntro.querySelector(
            ".intro-content"
        );


    const skip =
        cinematicIntro.querySelector(
            ".skip-intro"
        );


    const startTime =
        performance.now();


    /*
       3.55 seconds of continuous camera
       movement.
    */

    const duration = 3550;


    /*
       Short black hold.

       This is intentionally short so the
       transition does not feel like the
       website has frozen.
    */

    const blackDuration = 220;


    cinematicIntro.classList.add(
        "camera-flight"
    );


    /*
       Stop the idle scene float during the
       actual camera move.
    */

    scene.style.animation = "none";


    function animate(now) {

        if (introFinished) {
            return;
        }


        const elapsed =
            now - startTime;


        const raw =
            Math.max(
                0,
                Math.min(
                    1,
                    elapsed / duration
                )
            );


        /* -----------------------------------------------------
           TEXT — FIRST TO DISAPPEAR
           ----------------------------------------------------- */

        let textOpacity = 1;
        let textScale = 1;
        let textBlur = 0;


        if (raw < 0.18) {

            const p =
                raw / 0.18;

            const e =
                cinematicEase(p);


            textOpacity =
                1 - e;


            textScale =
                1 - e * 0.025;


            textBlur =
                e * 1.6;

        } else {

            textOpacity = 0;

            textScale = 0.975;

            textBlur = 1.6;

        }


        content.style.opacity =
            textOpacity;


        content.style.transform =
            `translate3d(-50%,-50%,0) scale(${textScale})`;


        content.style.filter =
            `blur(${textBlur}px)`;


        /*
           Skip disappears with the rest of
           the intro UI once the cinematic
           camera begins its main movement.
        */

        if (skip) {

            skip.style.opacity =
                raw < 0.12

                    ? String(
                        1 -
                        cinematicEase(
                            raw / 0.12
                        )
                    )

                    : "0";

        }


        /* -----------------------------------------------------
           CAMERA — ONE CONTINUOUS MOTION
           ----------------------------------------------------- */

        const progress =
            cameraProgress(raw);


        const cameraScale =
            getCameraScale(
                progress
            );


        scene.style.transform =
            `translate3d(0,0,0) scale(${cameraScale})`;


        scene.style.filter =
            `
            brightness(${1 + progress * 0.06})
            contrast(${1 + progress * 0.035})
            `;


        /* -----------------------------------------------------
           BLACK HOLE — FIXED POSITION,
           AXIAL ROTATION ONLY
           ----------------------------------------------------- */

        const holeScale =
            getBlackHoleScale(raw);


        const rotation =
            elapsed * 0.012;


        /*
           Disable CSS animation while JavaScript
           controls the exact rotation.

           The position itself never changes.
        */

        introBlackHole.style.animation =
            "none";


        introBlackHole.style.transform =
            `
            translate3d(-50%,-50%,0)
            scale(${holeScale})
            rotate(${rotation}rad)
            `;


        introBlackHole.style.filter =
            `
            brightness(${1 + raw * 0.10})
            `;


        /* -----------------------------------------------------
           FINAL BLACK
           ----------------------------------------------------- */

        if (raw > 0.965) {

            const p =
                (raw - 0.965) / 0.035;


            finalBlackScreen.style.opacity =
                String(
                    Math.min(
                        1,
                        cinematicEase(p)
                    )
                );

        } else {

            finalBlackScreen.style.opacity =
                "0";

        }


        /* -----------------------------------------------------
           FINISH
           ----------------------------------------------------- */

        if (elapsed >= duration) {

            finalBlackScreen.style.opacity =
                "1";


            finishTimer =
                setTimeout(() => {

                    finishCinematicTransition();

                }, blackDuration);


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


    if (finishTimer) {

        clearTimeout(
            finishTimer
        );

        finishTimer = null;

    }


    finalBlackScreen.style.opacity =
        "1";


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


        startCinematicTransition();

    }
);


/* =========================================================
   SKIP INTRO — WORKS BEFORE OR
   DURING TRANSITION
   ========================================================= */

skipIntro.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        event.stopPropagation();


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


        if (finishTimer) {

            clearTimeout(
                finishTimer
            );

            finishTimer = null;

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
   PRELOAD IMAGES
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
   SHOW SLIDE
   ========================================================= */

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


revealStyle.textContent =
    `

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
