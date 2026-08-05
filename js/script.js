/* =========================================================
   GLOW — SCRIPT.JS
   ========================================================= */


/* =========================================================
   GLOW — CINEMATIC INTRO
   FINAL CAMERA SHOT
   ========================================================= */

document.documentElement.classList.add("intro-active");
document.body.classList.add("intro-active");


/* =========================================================
   ELEMENTS
   ========================================================= */

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

/*
   IMPORTANT:

   Your HTML uses:

   <div class="intro-black-screen"></div>

   It does NOT have an id.

   Therefore we use querySelector().
*/

const cinematicBlackScreen =
    cinematicIntro.querySelector(".intro-black-screen");


const introRing =
    cinematicIntro.querySelector(".black-hole-ring");


/* =========================================================
   STATE
   ========================================================= */

let introStarted = false;
let introFinished = false;

let introFrame = null;

let introStartTime = 0;

let finishTimer = null;


/* =========================================================
   HELPERS
   ========================================================= */

function clamp01(value) {

    return Math.max(
        0,
        Math.min(1, value)
    );
}


/*
   Very smooth easing.

   This is used for the camera itself.

   There are NO separate zoom stages.
*/

function cinematicEase(value) {

    const t =
        clamp01(value);

    return (
        t * t * t *
        (
            t *
            (
                t * 6 -
                15
            ) +
            10
        )
    );
}


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
   SKIP BUTTON
   ========================================================= */

function setSkipState(
    visible,
    clickable
) {

    if (!skipIntro) {
        return;
    }

    skipIntro.style.opacity =
        visible
            ? "1"
            : "0";

    skipIntro.style.visibility =
        visible
            ? "visible"
            : "hidden";

    skipIntro.style.pointerEvents =
        clickable
            ? "auto"
            : "none";

    skipIntro.style.zIndex =
        "999999";
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
       Keep the screen completely black
       for only a few milliseconds.
    */

    if (cinematicBlackScreen) {

        cinematicBlackScreen.style.opacity =
            "1";
    }


    /*
       Remove intro.
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
   SKIP
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
       Stop everything immediately.
    */

    cinematicIntro.style.animation =
        "none";

    cinematicIntro.style.transition =
        "none";


    introScene.style.animation =
        "none";

    introScene.style.transition =
        "none";


    introBlackHole.style.animation =
        "none";


    /*
       Hide intro immediately.
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
   START INTRO
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


    /*
       This class is only used to
       identify that the cinematic
       transition is running.

       JavaScript controls the actual
       camera movement.
    */

    cinematicIntro.classList.add(
        "intro-exit"
    );


    /*
       Skip remains clickable during
       the entire transition.
    */

    setSkipState(
        true,
        true
    );


    /*
       Reset everything.
    */

    cinematicIntro.style.opacity =
        "1";

    cinematicIntro.style.visibility =
        "visible";

    cinematicIntro.style.display =
        "block";


    introContent.style.opacity =
        "1";

    introContent.style.transform =
        "translate3d(-50%, -50%, 0) scale(1)";

    introContent.style.filter =
        "blur(0px)";


    /*
       CAMERA STARTS AT NORMAL SIZE.
    */

    introScene.style.transform =
        "translate3d(0,0,0) scale(1)";

    introScene.style.filter =
        "brightness(1) contrast(1)";


    /*
       VERY IMPORTANT:

       The black hole itself does NOT grow.

       The camera moves toward it.

       This makes the black hole appear
       larger naturally.
    */

    introBlackHole.style.transform =
        "translate3d(-50%, -50%, 0) scale(1)";

    introBlackHole.style.filter =
        "brightness(1)";

    /*
       Black screen starts invisible.
    */

    if (cinematicBlackScreen) {

        cinematicBlackScreen.style.opacity =
            "0";
    }


    /*
       Start timing.
    */

    introStartTime =
        performance.now();


    /*
       Total cinematic shot.

       0.00 — 0.65 sec
       Text disappears.

       0.65 — 3.85 sec
       Camera continuously moves
       toward black hole.

       3.85 — 4.00 sec
       Black hole covers screen.

       Then a few milliseconds of black.
    */

    const TEXT_DURATION =
        650;

    const CAMERA_DURATION =
        3200;

    const BLACK_HOLD =
        5;


    const TOTAL_DURATION =
        TEXT_DURATION +
        CAMERA_DURATION;


    /* =====================================================
       ANIMATION LOOP
       ===================================================== */

    function animate(now) {

        if (introFinished) {
            return;
        }


        const elapsed =
            now -
            introStartTime;


        /* =================================================
           PHASE 1
           TEXT DISAPPEARS
           ================================================= */

        const textProgress =
            clamp01(
                elapsed /
                TEXT_DURATION
            );


        const textEase =
            cinematicEase(
                textProgress
            );


        introContent.style.opacity =
            String(
                1 -
                textEase
            );


        introContent.style.transform =
            `
            translate3d(-50%, -50%, 0)
            scale(${1 - textEase * 0.025})
            `;


        introContent.style.filter =
            `
            blur(${textEase * 2}px)
            `;


        /*
           Camera stays completely still
           while text disappears.
        */

        if (
            elapsed <
            TEXT_DURATION
        ) {

            introScene.style.transform =
                "translate3d(0,0,0) scale(1)";

            introScene.style.filter =
                "brightness(1) contrast(1)";


            introFrame =
                requestAnimationFrame(
                    animate
                );

            return;
        }


        /* =================================================
           PHASE 2
           CAMERA FLIGHT
           ================================================= */

        const cameraElapsed =
            elapsed -
            TEXT_DURATION;


        const cameraRaw =
            clamp01(
                cameraElapsed /
                CAMERA_DURATION
            );


        /*
           ONE continuous camera curve.

           No:
           zoom → pause → zoom.

           Just one continuous movement.
        */

        const cameraProgress =
            cinematicEase(
                cameraRaw
            );


        /* =================================================
           CAMERA SCALE
           ================================================= */

        /*
           Black hole is positioned at roughly
           52% horizontal / 22% vertical.

           The scene origin is placed at the
           black hole's position.

           Therefore the camera moves directly
           toward it.
        */

        const startScale =
            1;

        const finalScale =
            13;


        const scale =
            startScale *
            Math.pow(
                finalScale /
                startScale,
                cameraProgress
            );


        introScene.style.transform =
            `
            translate3d(0,0,0)
            scale(${scale})
            `;


        /*
           Very subtle cinematic exposure.
        */

        introScene.style.filter =
            `
            brightness(${1 + cameraProgress * 0.06})
            contrast(${1 + cameraProgress * 0.025})
            `;


        /* =================================================
           BLACK HOLE
           ================================================= */

        /*
           DO NOT SCALE THE BLACK HOLE.

           The camera is moving toward it.

           This is the critical difference.
        */

        introBlackHole.style.transform =
            `
            translate3d(-50%, -50%, 0)
            scale(1)
            `;


        /*
           Slight brightness increase
           as we approach the event horizon.
        */

        introBlackHole.style.filter =
            `
            brightness(${1 + cameraProgress * 0.05})
            `;

        /* =================================================
           FINAL BLACK
           ================================================= */

        /*
           Don't turn black until the black hole
           is almost completely filling the frame.
        */

        const blackStart =
            0.995;


        const blackRaw =
            clamp01(
                (
                    cameraRaw -
                    blackStart
                ) /
                (
                    1 -
                    blackStart
                )
            );


        const blackOpacity =
            cinematicEase(
                blackRaw
            );


        if (cinematicBlackScreen) {

            cinematicBlackScreen.style.opacity =
                String(
                    blackOpacity
                );
        }


        /* =================================================
           FINISH
           ================================================= */

        if (
            elapsed >=
            TOTAL_DURATION
        ) {

            if (cinematicBlackScreen) {

                cinematicBlackScreen.style.opacity =
                    "1";
            }


            /*
               Only a few milliseconds of pure black.
            */

            finishTimer =
                setTimeout(
                    () => {

                        finishCinematicIntro();

                    },
                    BLACK_HOLD
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
   ENTER BUTTON
   ========================================================= */

enterGlow.addEventListener(
    "click",
    event => {

        event.preventDefault();

        startCinematicIntro();
    }
);


/* =========================================================
   SKIP BUTTON
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
   ESCAPE
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

setSkipState(
    true,
    true
);


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
