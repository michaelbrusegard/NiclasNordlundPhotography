// Array for image path and dimensions
const files = [
    [
        "architectural01.jpg",
        1700,
        1063
    ],
    [
        "architectural02.jpg",
        1200,
        1600
    ],
    [
        "architectural03.jpg",
        1700,
        1133
    ],
    [
        "architectural04.jpg",
        1700,
        907
    ],
    [
        "architectural05.jpg",
        1700,
        1190
    ],
    [
        "architectural06.jpg",
        1700,
        956
    ],
    [
        "architectural07.jpg",
        1700,
        956
    ],
    [
        "architectural08.jpg",
        1700,
        956
    ],
    [
        "architectural09.jpg",
        1680,
        1200
    ],
    [
        "architectural10.jpg",
        1700,
        1105
    ],
    [
        "architectural11.jpg",
        1680,
        1200
    ],
    [
        "architectural12.jpg",
        1700,
        1063
    ],
    [
        "architectural13.jpg",
        1700,
        1106
    ],
    [
        "architectural14.jpg",
        1700,
        1062
    ],
    [
        "architectural15.jpg",
        1700,
        956
    ],
    [
        "architectural16.jpg",
        1700,
        1063
    ],
    [
        "architectural17.jpg",
        1700,
        1000
    ],
    [
        "architectural18.jpg",
        1700,
        956
    ],
    [
        "architectural19.jpg",
        1700,
        1063
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