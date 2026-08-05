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
    introBlackHole.className = "intro-black-hole";
    cinematicIntro.appendChild(introBlackHole);

}


/* =========================================================
   FINAL BLACK SCREEN
   ========================================================= */

let finalBlackScreen =
    cinematicIntro.querySelector(".cinematic-black-screen");

if (!finalBlackScreen) {

    finalBlackScreen = document.createElement("div");
    finalBlackScreen.className = "cinematic-black-screen";
    cinematicIntro.appendChild(finalBlackScreen);

}


/* =========================================================
   CINEMATIC TIMING
   ========================================================= */

const CAMERA_DURATION = 3000;
const BLACK_HOLD = 220;


/* =========================================================
   EASING
   ========================================================= */

function cinematicEase(t) {

    /*
       Smooth cinematic acceleration.

       No separate zoom stages.
       No pauses.
       No sudden changes.
    */

    return 1 - Math.pow(1 - t, 4);

}


/* =========================================================
   RESET INTRO
   ========================================================= */

function resetIntro() {

    if (introFrame) {

        cancelAnimationFrame(introFrame);
        introFrame = null;

    }

    if (finishTimer) {

        clearTimeout(finishTimer);
        finishTimer = null;

    }

    introStarted = false;
    introFinished = false;

    cinematicIntro.style.display = "";
    cinematicIntro.style.opacity = "1";
    cinematicIntro.style.visibility = "visible";
    cinematicIntro.style.pointerEvents = "";

    finalBlackScreen.style.opacity = "0";

    introBlackHole.style.transform =
        "translate(-50%, -50%) scale(1) rotate(0deg)";

    const introScene =
        cinematicIntro.querySelector(".intro-scene");

    if (introScene) {

        introScene.style.transform =
            "scale(1.03)";

        introScene.style.filter =
            "brightness(1)";

    }

}


/* =========================================================
   FINISH INTRO
   ========================================================= */

function finishIntro() {

    if (introFinished) {
        return;
    }

    introFinished = true;

    if (introFrame) {

        cancelAnimationFrame(introFrame);
        introFrame = null;

    }

    if (finishTimer) {

        clearTimeout(finishTimer);
        finishTimer = null;

    }

    finalBlackScreen.style.opacity = "1";

    finishTimer = setTimeout(() => {

        cinematicIntro.style.display = "none";

        document.body.classList.remove("intro-playing");

        unlockPage();

        finishTimer = null;

    }, BLACK_HOLD);

}


/* =========================================================
   ENTER GLOW — CINEMATIC CAMERA
   ========================================================= */

function startCinematicExit() {

    if (introStarted || introFinished) {
        return;
    }

    introStarted = true;

    document.body.classList.add("intro-playing");

    cinematicIntro.classList.add("intro-exit");

    const introScene =
        cinematicIntro.querySelector(".intro-scene");

    const introContent =
        cinematicIntro.querySelector(".intro-content");

    const introVignette =
        cinematicIntro.querySelector(".intro-vignette");

    const introStars =
        cinematicIntro.querySelector(".intro-stars");


    /* -----------------------------------------------------
       TEXT DISAPPEARS FIRST
       ----------------------------------------------------- */

    if (introContent) {

        introContent.style.transition =
            "opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), " +
            "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

        introContent.style.opacity = "0";

        introContent.style.transform =
            "translate(-50%, -50%) scale(0.94)";

    }


    /* -----------------------------------------------------
       SKIP BUTTON DISAPPEARS
       ----------------------------------------------------- */

    if (skipIntro) {

        skipIntro.style.transition =
            "opacity 0.4s ease";

        skipIntro.style.opacity = "0";

    }


    /* -----------------------------------------------------
       START CAMERA AFTER TEXT DISAPPEARS
       ----------------------------------------------------- */

    setTimeout(() => {

        if (introFinished) {
            return;
        }

        const startTime =
            performance.now();

        function animateCamera(now) {

            if (introFinished) {
                return;
            }

            const elapsed =
                now - startTime;

            const rawProgress =
                Math.min(
                    elapsed / CAMERA_DURATION,
                    1
                );

            const progress =
                cinematicEase(rawProgress);


            /* ---------------------------------------------
               CAMERA ZOOM
               --------------------------------------------- */

            /*
               The camera continuously moves toward
               the black hole.

               No keyframe stages.
               No stopping points.
            */

            const sceneScale =
                1.03 +
                (7.8 - 1.03) * progress;


            if (introScene) {

                introScene.style.transform =
                    `scale(${sceneScale})`;

                /*
                   Slight brightness increase as the
                   camera approaches the black hole.
                */

                const brightness =
                    1 +
                    (1.32 - 1) * progress;

                introScene.style.filter =
                    `brightness(${brightness})`;

            }


            /* ---------------------------------------------
               BLACK HOLE EXPANSION
               --------------------------------------------- */

            /*
               The black hole remains at the exact same
               position.

               Only its rotation and size change.
            */

            const blackHoleScale =
                1 +
                Math.pow(progress, 2.6) * 42;

            const rotation =
                progress * 360;


            introBlackHole.style.transform =
                `translate(-50%, -50%) ` +
                `scale(${blackHoleScale}) ` +
                `rotate(${rotation}deg)`;


            /* ---------------------------------------------
               VIGNETTE
               --------------------------------------------- */

            if (introVignette) {

                const vignetteOpacity =
                    1 +
                    progress * 0.35;

                introVignette.style.opacity =
                    vignetteOpacity;

            }


            /* ---------------------------------------------
               STARS / SPACE
               --------------------------------------------- */

            if (introStars) {

                const starScale =
                    1 +
                    progress * 3;

                const starOpacity =
                    0.18 +
                    progress * 0.12;

                introStars.style.transform =
                    `scale(${starScale})`;

                introStars.style.opacity =
                    starOpacity;

            }


            /* ---------------------------------------------
               BLACK SCREEN
               --------------------------------------------- */

            /*
               The black hole reaches the screen near
               the end of the camera movement.

               Then the entire screen becomes black.
            */

            if (rawProgress > 0.82) {

                const blackProgress =
                    (rawProgress - 0.82) / 0.18;

                const blackOpacity =
                    Math.min(
                        Math.pow(blackProgress, 2),
                        1
                    );

                finalBlackScreen.style.opacity =
                    blackOpacity;

            }


            /* ---------------------------------------------
               CONTINUE
               --------------------------------------------- */

            if (rawProgress < 1) {

                introFrame =
                    requestAnimationFrame(
                        animateCamera
                    );

            } else {

                introFrame = null;

                finalBlackScreen.style.opacity =
                    "1";

                finishIntro();

            }

        }


        introFrame =
            requestAnimationFrame(
                animateCamera
            );

    }, 550);

}


/* =========================================================
   ENTER BUTTON
   ========================================================= */

if (enterGlow) {

    enterGlow.addEventListener(
        "click",
        startCinematicExit
    );

}


/* =========================================================
   SKIP INTRO
   ========================================================= */

if (skipIntro) {

    skipIntro.addEventListener(
        "click",
        () => {

            /*
               Stop everything immediately.
            */

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


            introStarted = false;
            introFinished = true;


            /*
               Remove cinematic intro.
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
               Remove page lock.
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
   SHOW HERO SLIDE
   ========================================================= */

function showSlide(index) {

    currentSlide =
        (index + slides.length)
        % slides.length;

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
   ESCAPE SEARCH
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
