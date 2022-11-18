// Array for image path and dimensions
const files = [
    [
        "portrait01.jpg",
        1125,
        1700
    ],
    [
        "portrait02.jpg",
        1700,
        1134
    ],
    [
        "portrait03.jpg",
        1700,
        1063
    ],
    [
        "portrait04.jpg",
        1700,
        1134
    ],
    [
        "portrait05.jpg",
        1200,
        1200
    ],
    [
        "portrait06.jpg",
        1700,
        956
    ],
    [
        "portrait07.jpg",
        1700,
        1133
    ],
    [
        "portrait08.jpg",
        1133,
        1700
    ],
    [
        "portrait09.jpg",
        1700,
        956
    ],
    [
        "portrait10.jpg",
        1600,
        1200
    ],
    [
        "portrait11.jpg",
        1700,
        1063
    ],
    [
        "portrait12.jpg",
        1700,
        1133
    ],
    [
        "portrait13.jpg",
        1133,
        1700
    ],
    [
        "portrait14.jpg",
        1600,
        1200
    ],
    [
        "portrait15.jpg",
        1700,
        1133
    ],
    [
        "portrait16.jpg",
        1700,
        895
    ]
];

// Column variables
const columnSize = 384;

// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); loadImages(files); addImagesFadeOnScroll(); });
window.addEventListener('resize', () => { loadImages(files);});
window.addEventListener('orientationChange', () => { loadImages(files);});

// Animation when scrolling
window.addEventListener('scroll', () => {addImagesFadeOnScroll();});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});
getLinkIcon(getCurrentNavElement(shopNav), 'linkSignature').addEventListener('animationend', () => {removeAnimationEndOnNavElements(shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});