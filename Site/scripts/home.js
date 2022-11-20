// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loading style from CSS variables
const style = getComputedStyle(document.body);

// Getting home elements
const contentContainer = document.getElementById('contentContainer');

// Gets the divs with the quotes and the quotes p
const quotesDaddy = document.querySelectorAll('.quotesDaddy')
const quoteElements = document.querySelectorAll('.quotesDaddy p');

// Gets the div containing the images and the images
const imageDaddy = document.querySelector('#imageDaddy')
const images = document.querySelectorAll('#imageDaddy img');

// Interval time for the carousel in ms and which images is displayed
const intervalTime = 5000
let imageDisplayed = 0

// Animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {slideTransition(nav, shopNav, navigatedFromShop); getNiclasLeftPx(); imagePosition(); textPosition(); observeHome(); imageCarousel(); });

window.addEventListener("resize", () => {getNiclasLeftPx(); imagePosition(); textPosition();});
window.addEventListener("orientationChange", () => {getNiclasLeftPx(); imagePosition(); textPosition();});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener('animationend', () => {animationEndOnNavElements(nav, shopNav)});
getLinkIcon(getCurrentNavElement(shopNav), 'linkCart').addEventListener('animationend', () => {removeAnimationEndOnNavElements(shopNav)});

// Checks when menu is clicked
menu.addEventListener('click', () => {mobileMenu(menu, nav)});

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll('.arrow');

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach(el => {
  el.addEventListener('click', event => {
  event.preventDefault();
  document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
})});