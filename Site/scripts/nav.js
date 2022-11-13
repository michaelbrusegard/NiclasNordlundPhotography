// Checks for a click on menu button

const linkMenu = document.querySelector('.linkMenu');
const mobileNav = document.querySelector('.mobileNav');
const desktopNav = document.querySelector('.desktopNav');

// Checks when menu is clicked
linkMenu.addEventListener('click', () => {
    linkMenu.classList.toggle('clicked');
    desktopNav.classList.toggle('active');
    mobileNav.classList.toggle('active');
}); 

// Changes navigation bar to shop at the end of animation

const linkBag = document.querySelector('.linkBag');
const linkText = document.querySelector('.linkText');
const linkSignature = document.querySelector('.linkSignature');

linkBag.addEventListener("animationend", () => {
    
    //Remove old nav bar items and replace with shop ones
}); 