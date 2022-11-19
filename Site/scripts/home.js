// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loading style from CSS variables
const style = getComputedStyle(document.body);

let imageDisplayed = 0

// Animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); getNiclasLeftPx(); imagePosition(); imageCarousel()});

window.addEventListener("resize", () => {getNiclasLeftPx(); imagePosition(); });
window.addEventListener("orientationChange", () => {getNiclasLeftPx(); imagePosition(); });

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});
getLinkIcon(getCurrentNavElement(shopNav), 'linkCart').addEventListener('animationend', () => {removeAnimationEndOnNavElements(shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});