// Get photos from google cloud bucket
async function getShowcaseBucket(page) {
    const response = await fetch(`/get-${page}-showcase-bucket`);
    const data = await response.json();
    return data;
}

async function fetchBucketData(showcaseBucket) {
    const response = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${showcaseBucket}/o?fields=items(name)&delimiter=/`
    );
    const data = await response.json();
    const files = data.items.map((item) => item.name);
    return files;
}

const gallery = document.querySelector(".gallery");

// Column variables
let columnSize = 384;
let currentColumns = 0;
let maxNumberColumns = 5;

// Chosing array
let page = window.location.pathname.split("/").pop().slice(0, -5);

if (page === "nature" || page === "wedding") {
    columnSize *= 1.5;
}

// Create an observer for showcaseFadeOnscroll
const addPhotosFadeOnScroll = new IntersectionObserver(showcaseFadeOnscroll);

// Variables for slide transition
const nav = document.getElementById("nav");
const shopNav = document.getElementById("shopNav");
const navigatedFromShop = ["shop"];
let navigatedFrom = document.referrer;

// Variable for mobile menu
const menu = document.querySelector(".linkMenu");
let menuClick = 0;

// Loads photos into columns
document.addEventListener("DOMContentLoaded", () => {
    slideTransition(nav, shopNav, navigatedFromShop);
    loadPhotos();
});

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        const debouncedFunction = () => {
            if (getColumns() !== currentColumns) {
                func.apply(this, args);
            }
        };

        timeoutId = setTimeout(debouncedFunction, delay);
    };
}

window.addEventListener("resize", debounce(loadPhotos, 200));

window.addEventListener("orientationChange", debounce(loadPhotos, 200));

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), "linkBag").addEventListener(
    "animationend",
    () => {
        animationEndOnNavElements(nav, shopNav);
    }
);
getLinkIcon(getCurrentNavElement(shopNav), "linkSignature").addEventListener(
    "animationend",
    () => {
        removeAnimationEndOnNavElements(shopNav);
    }
);

// Checks when menu is clicked
menu.addEventListener("click", () => {
    mobileMenu(menu, nav);
    writeUnderline(document.querySelector(".underline .path"));
});
