// Array for image path and dimensions
const files = [
    [
        "animals01.jpg",
        1700,
        1063
    ],
    [
        "animals02.jpg",
        1700,
        1133
    ],
    [
        "animals03.jpg",
        1200,
        1680
    ],
    [
        "animals04.jpg",
        1700,
        1133
    ],
    [
        "animals05.jpg",
        1700,
        1063
    ],
    [
        "animals06.jpg",
        1700,
        1133
    ],
    [
        "animals07.jpg",
        1700,
        1133
    ],
    [
        "animals08.jpg",
        1200,
        1680
    ],
    [
        "animals09.jpg",
        1700,
        1062
    ],
    [
        "animals10.jpg",
        1680,
        1200
    ],
    [
        "animals11.jpg",
        1700,
        1062
    ],
    [
        "animals12.jpg",
        1700,
        1063
    ],
    [
        "animals13.jpg",
        1700,
        850
    ],
    [
        "animals14.jpg",
        1700,
        956
    ],
    [
        "animals15.jpg",
        1700,
        956
    ],
    [
        "animals16.jpg",
        1700,
        904
    ],
    [
        "animals17.jpg",
        1700,
        785
    ],
    [
        "animals18.jpg",
        1700,
        904
    ],
    [
        "animals19.jpg",
        1700,
        1046
    ]
];

// Column variables
const columnSize = 384;
const maxColumns = 5;

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