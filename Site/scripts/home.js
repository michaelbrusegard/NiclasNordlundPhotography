// Variables for slide transition
const nav = document.getElementById('nav');
const shopNav = document.getElementById('shopNav');
const navigatedFromShop = ['shop.html'];
let navigatedFrom = document.referrer;

// Variable for mobile menu
const menu = document.querySelector('.linkMenu');

// Loading style from CSS variables
const style = getComputedStyle(document.body);

// Getting home elements
const contentContainer = document.getElementById('contentContainer');

// Gets the divs with the quotes and the quotes p
const quotesDaddy = document.querySelectorAll('.quotesDaddy');
const quoteElements = document.querySelectorAll('.quotesDaddy p');

// Gets the div containing the images and the images
const imageDaddy = document.querySelector('#imageDaddy');
const images = document.querySelectorAll('#imageDaddy img');

// Interval time for the carousel in ms and which images is displayed
const intervalTime = 5000;
let imageDisplayed = 0;

// Text to be displayed on the home page
const quoteText = ['Born in Mariehamn in 1965, I always had an interest in animals and nature.',
  'Photography was always there as a hobby, but in 2018, I took the step to become a full time freelance photographer.',
  `Besides the photography itself, I also create pictures to hang on your wall, postcards, jigsaw puzzles and other products 
showing the beautiful landscapes, nature and animals of the Åland Islands.`,
  'In 2022, I received the award for Post Card Artist of the Year in Finland, and today I have around 40 different post card designs.',
  'Shown below are some of my personal favourite photos.'];

// Adjust the speed parameters of the typing animations
const slowTyping = 32;
const fastTyping = 8;
let timeOutLength = slowTyping;
let isFast = false;
let isTyping = false;
let isFinishedTyping = Array(5).fill(false);
let firstClick = true;
let nextIndex = 1;
let firstClickAfterQuote = false;
let currentIndex = 0;


// Adjust the speed of the typing animation
for (const element of quotesDaddy) {
  element.addEventListener('click', () => {
    if(isFinishedTyping[currentIndex]) {
      firstClick = false;
    } else {
      firstClickAfterQuote = true
    }
    if (firstClick) {
      if (isFast) {
        timeOutLength = slowTyping;
        isFast = false;
      } else {
        timeOutLength = fastTyping;
        isFast = true;
      }
    } else {
      scrollToNextQuote(nextIndex);
      firstClick = true;
    }
  });
}

// Animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  slideTransition(nav, shopNav, navigatedFromShop);
  console.log(window.scrollY);
  getNiclasLeftPx(); imagePosition(); textPosition();
  imageCarousel(); observeHome();
});

window.addEventListener("resize", () => { getNiclasLeftPx(); imagePosition(); textPosition(); });
window.addEventListener("orientationChange", () => { getNiclasLeftPx(); imagePosition(); textPosition(); });

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), 'linkBag').addEventListener('animationend', () => { animationEndOnNavElements(nav, shopNav); });
getLinkIcon(getCurrentNavElement(shopNav), 'linkCart').addEventListener('animationend', () => { removeAnimationEndOnNavElements(shopNav); });

// Checks when menu is clicked
menu.addEventListener('click', () => { mobileMenu(menu, nav); });

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll('.arrow');

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach(el => {
  el.addEventListener('click', event => {
    event.preventDefault();
    quotesDaddy[0].scrollIntoView({ behavior: "smooth" });
  });
});