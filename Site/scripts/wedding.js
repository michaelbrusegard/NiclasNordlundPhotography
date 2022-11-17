// Array for image path and dimensions
const files = [
    [
        "wedding01.jpg",
        1133,
        1700
    ],
    [
        "wedding02.jpg",
        1700,
        1063
    ],
    [
        "wedding03.jpg",
        1700,
        1133
    ]
];

// Column variables
const columnSize = 384 * 1.5;
const maxColumns = 3;

// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); loadImages(files); showcaseFadeOnscroll(); });
window.addEventListener('resize', () => { loadImages(files); showcaseFadeOnscroll(); });
window.addEventListener('orientationChange', () => { loadImages(files); showcaseFadeOnscroll(); });

// Adds ending part of animation
getLinkBag(getCurrentNavElement(shopNav)).addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});