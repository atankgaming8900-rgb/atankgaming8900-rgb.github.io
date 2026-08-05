/* =========================================================
   GLOW — CINEMATIC INTRO + MAIN WEBSITE SCRIPT
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


let introFinished = false;
let introTransitionRunning = false;


/* =========================================================
   UNLOCK PAGE
   ========================================================= */

function unlockPage() {

    document.documentElement.classList.remove("intro-active");
    document.body.classList.remove("intro-active");

}


/* =========================================================
   SHOW HOMEPAGE
   ========================================================= */

function showHomepage() {

    if (introFinished) {
        return;
    }

    introFinished = true;

    document.body.classList.remove("intro-playing");

    cinematicIntro.classList.remove("intro-exit");
    cinematicIntro.classList.remove("intro-skip");

    cinematicIntro.style.display = "none";

    unlockPage();

}


/* =========================================================
   SKIP INTRO
   ========================================================= */

function skipCinematicIntro() {

    if (introFinished) {
        return;
    }

    introFinished = true;
    introTransitionRunning = false;

    /*
       Remove every intro animation immediately.
    */

    cinematicIntro.classList.remove("intro-exit");
    cinematicIntro.classList.add("intro-skip");

    cinematicIntro.style.animation = "none";
    cinematicIntro.style.transition = "none";

    /*
       Force the intro to disappear.
    */

    cinematicIntro.style.opacity = "0";
    cinematicIntro.style.visibility = "hidden";
    cinematicIntro.style.pointerEvents = "none";

    /*
       Make sure the homepage is visible.
    */

    document.body.classList.remove("intro-playing");

    unlockPage();

}


/* =========================================================
   SKIP BUTTON
   ========================================================= */

if (skipIntro) {

    skipIntro.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        skipCinematicIntro();

    });

}


/* =========================================================
   ENTER GLOW
   ========================================================= */

if (enterGlow) {

    enterGlow.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        /*
           Prevent double-clicking the button from
           starting multiple transitions.
        */

        if (introFinished || introTransitionRunning) {
            return;
        }

        introTransitionRunning = true;

        /*
           Hide homepage while cinematic transition
           is happening.
        */

        document.body.classList.add("intro-playing");

        /*
           Start the cinematic camera sequence.
        */

        cinematicIntro.classList.add("intro-exit");

        /*
           Transition duration:
           
           ~2.8s camera movement
           ~0.4s black screen
           
           Total ≈ 3.2 seconds.
        */

        setTimeout(function () {

            if (introFinished) {
                return;
            }

            showHomepage();

        }, 3200);

    });

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

slides.forEach(function (slide) {

    const image = new Image();

    image.src = slide.image;

});


/* =========================================================
   SHOW HERO SLIDE
   ========================================================= */

function showSlide(index) {

    currentSlide =
        (index + slides.length) % slides.length;

    const slide = slides[currentSlide];


    /*
       Fade text and background out.
    */

    if (heroTitle) {
        heroTitle.style.opacity = "0";
    }

    if (heroDescription) {
        heroDescription.style.opacity = "0";
    }

    if (heroBackground) {
        heroBackground.style.opacity = "0";
    }


    /*
       Change image and text after fade.
    */

    setTimeout(function () {

        if (heroTitle) {
            heroTitle.textContent = slide.title;
        }

        if (heroDescription) {
            heroDescription.textContent =
                slide.description;
        }

        setHeroImage(slide.image);


        if (heroTitle) {
            heroTitle.style.opacity = "1";
        }

        if (heroDescription) {
            heroDescription.style.opacity = "1";
        }

        if (heroBackground) {
            heroBackground.style.opacity = "1";
        }

    }, 350);


    /*
       Update slider dots.
    */

    sliderDots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    /*
       Restart automatic slideshow.
    */

    clearTimeout(slideTimer);

    slideTimer = setTimeout(function () {

        showSlide(currentSlide + 1);

    }, 4000);

}


/* =========================================================
   HERO DOT NAVIGATION
   ========================================================= */

sliderDots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showSlide(index);

    });

});


/* =========================================================
   START HERO SLIDESHOW
   ========================================================= */

setHeroImage(slides[0].image);


sliderDots.forEach(function (dot, i) {

    dot.classList.toggle(
        "active",
        i === 0
    );

});


slideTimer = setTimeout(function () {

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

if (searchButton) {

    searchButton.addEventListener("click", function () {

        searchOverlay.classList.add("active");

        setTimeout(function () {

            if (searchInput) {
                searchInput.focus();
            }

        }, 300);

    });

}


/* =========================================================
   CLOSE SEARCH
   ========================================================= */

if (closeSearch) {

    closeSearch.addEventListener("click", function () {

        searchOverlay.classList.remove("active");

        searchInput.value = "";
        searchResults.innerHTML = "";

    });

}


/* =========================================================
   CLOSE SEARCH WITH ESCAPE
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (
            searchOverlay &&
            searchOverlay.classList.contains("active")
        ) {

            searchOverlay.classList.remove("active");

            if (searchInput) {
                searchInput.value = "";
            }

            if (searchResults) {
                searchResults.innerHTML = "";
            }

        }

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

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        searchResults.innerHTML = "";


        if (!query) {
            return;
        }


        const results =
            shaders.filter(function (shader) {

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


        /*
           No results.
        */

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


        /*
           Display results.
        */

        results.forEach(function (shader) {

            const result =
                document.createElement("div");


            result.style.marginTop = "25px";

            result.style.padding = "20px";

            result.style.border =
                "1px solid rgba(255,255,255,0.09)";

            result.style.borderRadius = "14px";


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

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .shader-card, .feature, .release"
    );


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

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


/* =========================================================
   INITIALIZE REVEAL
   ========================================================= */

revealElements.forEach(function (element) {

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
            0.9s cubic-bezier(
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


document.head.appendChild(revealStyle);


/* =========================================================
   PREVENT EMPTY HASH LINKS FROM JUMPING
   ========================================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   SAFETY — IF INTRO ELEMENTS ARE MISSING
   ========================================================= */

if (!cinematicIntro) {

    unlockPage();

}


/* =========================================================
   SAFETY — PAGE LOAD
   ========================================================= */

/*
   Keep the intro active until the user either:

   1. Clicks ENTER GLOW
   2. Clicks SKIP INTRO

   This prevents the homepage from appearing underneath
   the cinematic sequence.
*/


window.addEventListener("load", function () {

    /*
       Make sure the intro is visible when the page loads.
    */

    if (
        cinematicIntro &&
        !introFinished
    ) {

        cinematicIntro.style.display = "flex";
        cinematicIntro.style.visibility = "visible";
        cinematicIntro.style.opacity = "1";

    }

});
