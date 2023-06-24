// Get photos from google cloud bucket
async function getShowcasePhotosBucket(page) {
    const response = await fetch(`/get${page}ShowcasePhotosBucket`);
    const data = await response.json();
    return data;
}

async function fetchBucketData(showcasePhotosBucket) {
    const response = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${showcasePhotosBucket}/o?fields=items(name)&delimiter=/`
    );
    const data = await response.json();
    const files = data.items.map((item) => item.name);
    return files;
}

// Column variables
let columnSize = 384;
let maxNumberColumns = 5;

// Chosing array
let page = window.location.pathname
    .split("/")
    .pop()
    .slice(0, -5)
    .replace(/^\w/, (c) => c.toUpperCase());

if (page === "Nature" || page === "Wedding") {
    columnSize *= 1.5;
}

// Create an observer for showcaseFadeOnscroll
const addPhotosFadeOnScroll = new IntersectionObserver(showcaseFadeOnscroll);

// Variables for slide transition
const nav = document.getElementById("nav");
const shopNav = document.getElementById("shopNav");
const navigatedFromShop = ["shop.html"];
let navigatedFrom = document.referrer;

// Variable for mobile menu
const menu = document.querySelector(".linkMenu");
let menuClick = 0;

// Loads photos into columns
document.addEventListener("DOMContentLoaded", () => {
    slideTransition(nav, shopNav, navigatedFromShop);
    loadPhotos();
});
window.addEventListener("resize", () => {
    loadPhotos();
});
window.addEventListener("orientationChange", () => {
    loadPhotos();
});

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
