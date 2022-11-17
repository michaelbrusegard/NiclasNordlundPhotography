// Array for image path and dimensions
const files = [
    [
        "sport01.jpg",
        1600,
        1200
    ],
    [
        "sport02.jpg",
        1700,
        956
    ],
    [
        "sport03.jpg",
        1700,
        1062
    ],
    [
        "sport04.jpg",
        1700,
        1062
    ],
    [
        "sport05.jpg",
        1680,
        1200
    ],
    [
        "sport06.jpg",
        1700,
        1062
    ],
    [
        "sport07.jpg",
        1700,
        1062
    ],
    [
        "sport08.jpg",
        1600,
        1200
    ],
    [
        "sport09.jpg",
        1700,
        1133
    ],
    [
        "sport10.jpg",
        1600,
        1200
    ],
    [
        "sport11.jpg",
        1700,
        956
    ],
    [
        "sport12.jpg",
        1700,
        956
    ],
    [
        "sport13.jpg",
        1700,
        1062
    ],
    [
        "sport14.jpg",
        1700,
        956
    ],
    [
        "sport15.jpg",
        1700,
        956
    ],
    [
        "sport16.jpg",
        1700,
        1133
    ],
    [
        "sport17.jpg",
        1600,
        1200
    ],
    [
        "sport18.jpg",
        1700,
        850
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

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); loadImages(files); showcaseFadeOnscroll(); });
window.addEventListener('resize', () => { loadImages(files); showcaseFadeOnscroll(); });
window.addEventListener('orientationChange', () => { loadImages(files); showcaseFadeOnscroll(); });

// Adds ending part of animation
getLinkBag(getCurrentNavElement(shopNav)).addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});