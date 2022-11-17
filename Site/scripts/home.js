// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop)});

// Adds ending part of animation
getLinkBag(getCurrentNavElement(shopNav)).addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});

// PUT ALL EVENTLISTENERS AND VARIABLES THAT ARE DECLARED OUTSIDE OF FUNCTIONS IN THIS FILE, 
// ONLY DEDICATED FUNCTIONS IN OTHER FILES