// Array for image path and dimensions
const files = [
    [
        "nature01.jpg",
        1700,
        1009
    ],
    [
        "nature02.jpg",
        1680,
        1200
    ],
    [
        "nature03.jpg",
        1700,
        1063
    ],
    [
        "nature04.jpg",
        1700,
        956
    ],
    [
        "nature05.jpg",
        1700,
        1063
    ],
    [
        "nature06.jpg",
        1700,
        1133
    ],
    [
        "nature07.jpg",
        1133,
        1700
    ],
    [
        "nature08.jpg",
        1700,
        744
    ],
    [
        "nature09.jpg",
        1700,
        1063
    ],
    [
        "nature10.jpg",
        1700,
        904
    ],
    [
        "nature11.jpg",
        1700,
        956
    ],
    [
        "nature12.jpg",
        1700,
        1074
    ],
    [
        "nature13.jpg",
        1200,
        1200
    ],
    [
        "nature14.jpg",
        1680,
        1200
    ],
    [
        "nature15.jpg",
        1700,
        1062
    ],
    [
        "nature16.jpg",
        1700,
        1133
    ],
    [
        "nature17.jpg",
        1700,
        904
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
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); loadImages(files); });
window.addEventListener('resize', () => { loadImages(files);});
window.addEventListener('orientationChange', () => { loadImages(files);});

// Animation when scrolling
window.addEventListener('scroll', () => {addImagesFadeOnScroll();});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});
getLinkIcon(getCurrentNavElement(shopNav), 'linkSignature').addEventListener('animationend', () => {removeAnimationEndOnNavElements(shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});