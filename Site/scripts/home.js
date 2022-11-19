// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loading style from CSS variables
const style = getComputedStyle(document.body);

// Animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); getNiclasLeftPx(); });

window.addEventListener("resize", () => {getNiclasLeftPx();});
window.addEventListener("orientationChange", () => {getNiclasLeftPx();});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});
getLinkIcon(getCurrentNavElement(shopNav), 'linkCart').addEventListener('animationend', () => {removeAnimationEndOnNavElements(shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});

// Button that scrolls down to the bottom of the window
const scrollDownButtons = document.querySelectorAll('.arrow');

// Eventlistener for scroll-down button
scrollDownButtons.forEach(el => {
  el.addEventListener('click', event => {
  event.preventDefault();
  document.documentElement.scrollTo({
      top: scrollMaxValue()
  });
})});
