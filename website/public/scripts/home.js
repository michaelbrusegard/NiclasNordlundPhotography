// Get photos from google cloud bucket
async function getPhotoCarouselBucket() {
    const response = await fetch(`/get-photo-carousel-bucket`);
    const data = await response.json();
    return data;
}

async function fetchBucketData(bucket) {
    const response = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${bucket}/o?fields=items(name)&delimiter=/`,
    );
    const data = await response.json();
    const files = data.items.map((item) => item.name);
    return files;
}

// Variables for slide transition
const nav = document.getElementById("nav");
const shopNav = document.getElementById("shopNav");
const navigatedFromShop = ["shop"];
let navigatedFrom = document.referrer;

// Variable for mobile menu
const menu = document.querySelector(".linkMenu");

// Loading style from CSS variables
const style = getComputedStyle(document.body);

// Getting home elements
const contentContainer = document.getElementById("contentContainer");
const niclasPhoto = document.querySelector(".niclasPhoto");

// Gets the divs with the quotes and the text
const quotesContainer = document.querySelectorAll(".quotesContainer");
const quoteElements = document.querySelectorAll(".quotesContainer p");

// Gets the div containing the photo carousel and the photos
const photoCarousel = document.querySelector("#photoCarousel");

// Interval time for the carousel in ms and which photo is displayed
const intervalTime = 4000;
const fastIntervalTime = 800;
let photoDisplayed = 0;

// Text to be displayed on the home page
const quoteText = [
    "Born in Mariehamn in 1965, I always had an interest in animals and nature.",
    "Photography was always there as a hobby, but in 2018, I took the step to become a full time freelance photographer.",
    `Besides the photography itself, I also create pictures to hang on your wall, postcards, jigsaw puzzles and other products 
showing the beautiful landscapes, nature and animals of the Åland Islands.`,
    "In 2022, I received the award for Post Card Artist of the Year in Finland, and today I have around 40 different post card designs.",
    "Shown below are some of my personal favourite photos.",
];

// Adjust the speed parameters of the typing animations
const slowTyping = 40;
const fastTyping = 8;
let timeOutLength = slowTyping;
let isFast = false;
let isTyping = false;
let isFinishedTyping = Array(quotesContainer.length).fill(false);
let currentIndex = 0;
let typingTimeoutId;

// Adjust the speed of the typing animation
for (const element of quotesContainer) {
    element.addEventListener("click", () => {
        interactQuote();
    });
}

// Animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    slideTransition(nav, shopNav, navigatedFromShop);
    setNiclasPhotoLeftPos();
    textPosition();
    initialisePhotoCarousel();
    setTimeout(() => {
        observeHome();
    }, intervalTime / 2);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" && currentIndex !== quotesContainer.length) {
        clearTimeout(typingTimeoutId);
        scrollToNextQuote(currentIndex + 1);
    } else if (event.key === "ArrowUp" && currentIndex !== 0) {
        clearTimeout(typingTimeoutId);
        scrollToNextQuote(currentIndex - 1);
    }
    if (event.key === "Enter") {
        interactQuote();
    }
});

contentContainer.addEventListener("scroll", () => {
    displayCopyrightFooter(contentContainer);
    clearTimeout(typingTimeoutId);
});

window.addEventListener("resize", () => {
    setNiclasPhotoLeftPos();
    textPosition();
    displayCopyrightFooter(contentContainer);
});
window.addEventListener("orientationChange", () => {
    setNiclasPhotoLeftPos();
    textPosition();
    displayCopyrightFooter(contentContainer);
});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), "linkBag").addEventListener(
    "animationend",
    () => {
        animationEndOnNavElements(nav, shopNav);
    },
);
getLinkIcon(getCurrentNavElement(shopNav), "linkCart").addEventListener(
    "animationend",
    () => {
        removeAnimationEndOnNavElements(shopNav);
    },
);

// Checks when menu is clicked
menu.addEventListener("click", () => {
    mobileMenu(menu, nav);
});

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll(".arrow");

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        quotesContainer[0].scrollIntoView({ behavior: "smooth" });
    });
});
