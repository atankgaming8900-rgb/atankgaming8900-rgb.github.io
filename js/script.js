/* =========================================================
   GLOW — CINEMATIC INTRO + GLOBAL SCRIPT
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

const introScene =
    document.querySelector(".intro-scene");

const introContent =
    document.querySelector(".intro-content");

const introBlackHole =
    document.querySelector(".intro-black-hole");


/* =========================================================
   INTRO STATE
   ========================================================= */

let introFinished = false;
let introTransitioning = false;


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

    cinematicIntro.classList.remove("intro-exit");
    cinematicIntro.classList.remove("intro-zoom");

    cinematicIntro.style.animation = "none";
    cinematicIntro.style.transition = "none";

    cinematicIntro.style.opacity = "0";
    cinematicIntro.style.visibility = "hidden";
    cinematicIntro.style.pointerEvents = "none";

    document.body.classList.remove("intro-playing");

    unlockPage();

    setTimeout(() => {

        cinematicIntro.style.display = "none";

    }, 50);

}


/* =========================================================
   SKIP INTRO
   ========================================================= */

function skipCinematicIntro() {

    if (introFinished) {
        return;
    }

    introFinished = true;
    introTransitioning = false;

    /* Stop every intro animation immediately */

    cinematicIntro.style.animation = "none";
    cinematicIntro.style.transition = "none";

    if (introScene) {
        introScene.style.animation = "none";
        introScene.style.transform = "none";
        introScene.style.filter = "none";
    }

    if (introBlackHole) {
        introBlackHole.style.animation = "none";
        introBlackHole.style.transform =
            "translate(-50%, -50%) scale(1)";
    }

    if (introContent) {
        introContent.style.animation = "none";
        introContent.style.opacity = "0";
    }

    /* Hide intro */

    cinematicIntro.classList.remove("intro-exit");
    cinematicIntro.classList.remove("intro-zoom");

    cinematicIntro.style.opacity = "0";
    cinematicIntro.style.visibility = "hidden";
    cinematicIntro.style.pointerEvents = "none";
    cinematicIntro.style.display = "none";

    /* Show homepage */

    document.body.classList.remove("intro-playing");

    unlockPage();

}


/* =========================================================
   SKIP BUTTON
   ========================================================= */

if (skipIntro) {

    skipIntro.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        skipCinematicIntro();

    });

}


/* =========================================================
   ESC KEY ALSO SKIPS INTRO
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        if (!introFinished) {
            skipCinematicIntro();
        }

    }

});


/* =========================================================
   ENTER GLOW
   ========================================================= */

if (enterGlow) {

    enterGlow.addEventListener("click", function(event) {

        event.preventDefault();

        if (introFinished || introTransitioning) {
            return;
        }

        introTransitioning = true;

        document.body.classList.add("intro-playing");

        /*
           The CSS handles the cinematic sequence:

           0.00s
           Text begins disappearing.

           0.35s
           Camera begins moving toward the black hole.

           ~2.4s
           Black hole begins expanding rapidly.

           ~2.8s
           Black hole fills the screen.

           ~3.0s
           Complete black.

           ~3.8s
           Homepage appears.
        */

        cinematicIntro.classList.add("intro-exit");

        /*
           Keep Skip Intro above the transition.
           This means the user can still skip while
           the cinematic animation is running.
        */

        if (skipIntro) {

            skipIntro.style.opacity = "1";
            skipIntro.style.visibility = "visible";
            skipIntro.style.pointerEvents = "auto";
            skipIntro.style.zIndex = "100000";

        }

        /*
           CSS transition duration.
           The timeout only removes the intro after
           the cinematic animation has completed.
        */

        setTimeout(function() {

            if (!introFinished) {
                finishIntro();
            }

        }, 3800);

    });

}


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

slides.forEach(function(slide) {

    const image = new Image();

    image.src = slide.image;

});


/* =========================================================
   SHOW HERO SLIDE
   ========================================================= */

function showSlide(index) {

    currentSlide =
        (index + slides.length) % slides.length;

    const slide =
        slides[currentSlide];


    /* Fade */

    heroTitle.style.opacity = "0";
    heroDescription.style.opacity = "0";
    heroBackground.style.opacity = "0";


    setTimeout(function() {

        heroTitle.textContent =
            slide.title;

        heroDescription.textContent =
            slide.description;

        setHeroImage(slide.image);

        heroTitle.style.opacity = "1";
        heroDescription.style.opacity = "1";
        heroBackground.style.opacity = "1";

    }, 350);


    /* Update dots */

    sliderDots.forEach(function(dot, i) {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    /* Restart slideshow */

    clearTimeout(slideTimer);

    slideTimer = setTimeout(function() {

        showSlide(currentSlide + 1);

    }, 4000);

}


/* =========================================================
   DOT NAVIGATION
   ========================================================= */

sliderDots.forEach(function(dot, index) {

    dot.addEventListener("click", function() {

        showSlide(index);

    });

});


/* =========================================================
   START HERO SLIDESHOW
   ========================================================= */

setHeroImage(slides[0].image);


sliderDots.forEach(function(dot, i) {

    dot.classList.toggle(
        "active",
        i === 0
    );

});


slideTimer = setTimeout(function() {

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

searchButton.addEventListener("click", function() {

    searchOverlay.classList.add("active");

    setTimeout(function() {

        searchInput.focus();

    }, 300);

});


/* =========================================================
   CLOSE SEARCH
   ========================================================= */

closeSearch.addEventListener("click", function() {

    searchOverlay.classList.remove("active");

    searchInput.value = "";
    searchResults.innerHTML = "";

});


/* =========================================================
   CLOSE SEARCH WITH ESCAPE
   ========================================================= */

document.addEventListener("keydown", function(event) {

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

searchInput.addEventListener("input", function() {

    const query =
        searchInput.value
            .toLowerCase()
            .trim();


    searchResults.innerHTML = "";


    if (!query) {
        return;
    }


    const results =
        shaders.filter(function(shader) {

            return (
                shader.name
                    .toLowerCase()
                    .includes(query) ||

                shader.category
                    .toLowerCase()
                    .includes(query) ||

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


    results.forEach(function(shader) {

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


        searchResults.appendChild(result);

    });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .shader-card, .feature, .release"
    );


const revealObserver =
    new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

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


revealElements.forEach(function(element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

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
            transform
            0.9s
            cubic-bezier(0.22, 1, 0.36, 1);

    }


    .revealed {

        opacity: 1;

        transform:
            translateY(0)
            scale(1);

    }

`;


document.head.appendChild(revealStyle);


/* =========================================================
   PREVENT EMPTY HASH LINKS FROM JUMPING
   ========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   SAFETY — KEEP SKIP INTRO CLICKABLE
   ========================================================= */

if (skipIntro) {

    skipIntro.style.pointerEvents = "auto";

}


/* =========================================================
   END OF SCRIPT
   ========================================================= */
