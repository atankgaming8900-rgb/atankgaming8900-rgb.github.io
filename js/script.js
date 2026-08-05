/* =========================================================
   GLOW — SCRIPT.JS
   ========================================================= */


/* =========================================================
   GLOW — CINEMATIC INTRO
   FINAL VERSION
   ========================================================= */

document.documentElement.classList.add("intro-active");
document.body.classList.add("intro-active");


const cinematicIntro =
    document.getElementById("cinematicIntro");

const enterGlow =
    document.getElementById("enterGlow");

const skipIntro =
    document.getElementById("skipIntro");

const introScene =
    cinematicIntro.querySelector(".intro-scene");

const introContent =
    cinematicIntro.querySelector(".intro-content");

const introBlackHole =
    document.getElementById("introBlackHole");

const cinematicBlackScreen =
    document.getElementById("cinematicBlackScreen");


let introStarted = false;
let introFinished = false;

let introFrame = null;

let introStartTime = 0;

let finishTimer = null;


/* =========================================================
   PAGE LOCK
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
   CLAMP
   ========================================================= */

function clamp01(value) {

    return Math.max(
        0,
        Math.min(1, value)
    );
}


/* =========================================================
   SMOOTH EASING

   One continuous curve.

   No stages.
   No pauses.
   No jumps.
   ========================================================= */

function smoothCamera(value) {

    const t = clamp01(value);

    /*
       Smooth acceleration.

       The derivative never suddenly changes
       between separate animation stages.
    */

    return (
        t * t * (
            3 - 2 * t
        )
    );
}


/* =========================================================
   CAMERA SCALE

   Exponential growth creates a natural
   cinematic forward movement.
   ========================================================= */

function getCameraScale(progress) {

    const startScale = 1.03;

    const endScale = 9.5;

    return (
        startScale *
        Math.pow(
            endScale / startScale,
            progress
        )
    );
}


/* =========================================================
   BLACK HOLE SCALE

   The black hole begins growing early enough
   to visually connect with the camera.

   There is NO sudden size jump.
   ========================================================= */

function getBlackHoleScale(progress) {

    /*
       Start growing from the beginning,
       but very slowly.

       This makes the camera and black hole
       feel like one physical movement.
    */

    const growth =
        Math.pow(
            progress,
            2.35
        );

    return (
        1 +
        growth * 31
    );
}


/* =========================================================
   TEXT FADE
   ========================================================= */

function getTextFade(progress) {

    const fadeProgress =
        clamp01(
            progress / 0.13
        );

    return smoothCamera(
        fadeProgress
    );
}


/* =========================================================
   FINAL BLACK
   ========================================================= */

function getBlackScreenOpacity(progress) {

    /*
       Black starts extremely late.

       This prevents the old:
       black → pause → black
       feeling.
    */

    const start = 0.965;

    const local =
        clamp01(
            (progress - start) /
            (1 - start)
        );

    return smoothCamera(local);
}


/* =========================================================
   SKIP STATE
   ========================================================= */

function setSkipEnabled(enabled) {

    if (!skipIntro) {
        return;
    }

    skipIntro.style.opacity =
        "1";

    skipIntro.style.visibility =
        "visible";

    skipIntro.style.pointerEvents =
        enabled
            ? "auto"
            : "none";

    skipIntro.style.zIndex =
        "99999";
}


/* =========================================================
   FINISH
   ========================================================= */

function finishCinematicIntro() {

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


    /*
       Keep black for only a very short moment.
    */

    cinematicBlackScreen.style.opacity =
        "1";


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


/* =========================================================
   SKIP INTRO

   THIS IS AN IMMEDIATE SKIP.

   It works:
   - before ENTER
   - during camera movement
   - while black hole is expanding
   ========================================================= */

function skipCinematicIntro() {

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


    /*
       Stop all visual animation immediately.
    */

    cinematicIntro.classList.remove(
        "intro-exit"
    );


    cinematicIntro.style.animation =
        "none";

    cinematicIntro.style.transition =
        "none";


    introScene.style.animation =
        "none";

    introScene.style.transform =
        "none";

    introScene.style.filter =
        "none";


    introBlackHole.style.animation =
        "none";

    introBlackHole.style.transform =
        "translate3d(-50%,-50%,0) scale(1)";


    introContent.style.animation =
        "none";

    introContent.style.opacity =
        "0";


    cinematicBlackScreen.style.opacity =
        "0";


    /*
       Remove intro completely.
    */

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


/* =========================================================
   START CINEMATIC INTRO
   ========================================================= */

function startCinematicIntro() {

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


    cinematicIntro.classList.add(
        "intro-exit"
    );


    /*
       Skip remains usable for the
       entire cinematic sequence.
    */

    setSkipEnabled(true);


    /*
       Reset visual state.
    */

    introScene.style.transform =
        "scale(1.03)";

    introScene.style.filter =
        "brightness(1) contrast(1)";


    introBlackHole.style.transform =
        "translate3d(-50%,-50%,0) scale(1)";


    introContent.style.opacity =
        "1";


    cinematicBlackScreen.style.opacity =
        "0";


    /*
       Start the ONE continuous animation.
    */

    introStartTime =
        performance.now();


    /*
       3.2 seconds for the camera shot.

       This is deliberately a single
       requestAnimationFrame timeline.
    */

    const DURATION = 3200;


    /*
       Very short black frame.

       NOT a long black screen.
    */

    const BLACK_HOLD = 90;


    function animate(now) {

        if (introFinished) {
            return;
        }


        const elapsed =
            now -
            introStartTime;


        const rawProgress =
            clamp01(
                elapsed /
                DURATION
            );


        /*
           ONE continuous camera curve.
        */

        const progress =
            smoothCamera(
                rawProgress
            );


        /* =====================================================
           CAMERA
           ===================================================== */

        const cameraScale =
            getCameraScale(
                progress
            );


        introScene.style.transform =
            `scale(${cameraScale})`;


        /*
           Very subtle exposure change.

           Cinematic rather than game-like.
        */

        const brightness =
            1 +
            progress *
            0.055;


        const contrast =
            1 +
            progress *
            0.018;


        introScene.style.filter =
            `brightness(${brightness}) contrast(${contrast})`;


        /* =====================================================
           BLACK HOLE
           ===================================================== */

        const holeScale =
            getBlackHoleScale(
                progress
            );


        /*
           IMPORTANT:

           The black hole NEVER translates.

           It stays at exactly the same
           sky position.

           Only apparent size changes.
        */

        introBlackHole.style.transform =
            `translate3d(-50%,-50%,0) scale(${holeScale})`;


        /*
           Slight natural exposure increase.
        */

        introBlackHole.style.filter =
            `brightness(${1 + progress * 0.045})`;


        /* =====================================================
           TEXT
           ===================================================== */

        const textFade =
            getTextFade(
                rawProgress
            );


        introContent.style.opacity =
            String(
                1 - textFade
            );


        introContent.style.transform =
            `translate3d(-50%,-50%,0) scale(${
                1 -
                textFade *
                0.018
            })`;


        introContent.style.filter =
            `blur(${textFade * 1.8}px)`;


        /* =====================================================
           FINAL BLACK
           ===================================================== */

        const blackOpacity =
            getBlackScreenOpacity(
                rawProgress
            );


        cinematicBlackScreen.style.opacity =
            String(
                blackOpacity
            );


        /* =====================================================
           END
           ===================================================== */

        if (
            rawProgress >= 1
        ) {

            cinematicBlackScreen.style.opacity =
                "1";


            finishTimer =
                setTimeout(
                    () => {

                        finishCinematicIntro();

                    },
                    BLACK_HOLD
                );


            return;
        }


        /*
           Continue on the next browser frame.

           This gives one uninterrupted
           60fps animation timeline.
        */

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
   ENTER GLOW
   ========================================================= */

enterGlow.addEventListener(
    "click",
    event => {

        event.preventDefault();

        startCinematicIntro();
    }
);


/* =========================================================
   SKIP INTRO
   ========================================================= */

skipIntro.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();

        skipCinematicIntro();
    }
);


/* =========================================================
   ESC = SKIP
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !introFinished
        ) {

            skipCinematicIntro();
        }
    }
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

setSkipEnabled(true);


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

const slides = [

    {
        title:
            "Red Sprites",

        description:
            "Experience Minecraft skies like never before.",

        image:
            "red-sprites-hero.png"
    },


    {
        title:
            "Aurora",

        description:
            "Bring atmospheric skies and immersive light to your world.",

        image:
            "aurora-hero.png"
    },


    {
        title:
            "Cinematic",

        description:
            "Experience beautiful lighting and breathtaking Minecraft worlds.",

        image:
            "sunset-hero.png"
    }

];


let currentSlide = 0;

let slideTimer;


/* =========================================================
   HERO ELEMENTS
   ========================================================= */

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

slides.forEach(
    (slide) => {

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

    if (
        !heroTitle ||
        !heroDescription ||
        !heroBackground
    ) {

        return;

    }


    currentSlide =
        (index + slides.length)
        % slides.length;


    const slide =
        slides[currentSlide];


    /*
       Fade current slide out.
    */

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


    /*
       Update dots.
    */

    sliderDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );


    /*
       Restart timer.
    */

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

if (heroBackground) {

    setHeroImage(
        slides[0].image
    );

}


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

if (searchButton) {

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

}


/* =========================================================
   CLOSE SEARCH
   ========================================================= */

function closeSearchOverlay() {

    if (!searchOverlay) {
        return;
    }


    searchOverlay.classList.remove(
        "active"
    );


    if (searchInput) {

        searchInput.value =
            "";

    }


    if (searchResults) {

        searchResults.innerHTML =
            "";

    }

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        closeSearchOverlay
    );

}


/* =========================================================
   SEARCH ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            searchOverlay &&
            searchOverlay.classList.contains(
                "active"
            )
        ) {

            closeSearchOverlay();

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

if (searchInput) {

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
                    (shader) => {

                        return (

                            shader.name
                                .toLowerCase()
                                .includes(
                                    query
                                )

                            ||

                            shader.category
                                .toLowerCase()
                                .includes(
                                    query
                                )

                            ||

                            shader.description
                                .toLowerCase()
                                .includes(
                                    query
                                )

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
                (shader) => {

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

}



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
                (entry) => {

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
    (element) => {

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
    .querySelectorAll(
        'a[href="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        }
    );
