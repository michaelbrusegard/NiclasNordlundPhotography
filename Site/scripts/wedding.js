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
getLinkIcon(getCurrentNavElement(shopNav), 'linkCart').addEventListener('animationend', () => {removeAnimationEndOnNavElements(shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});