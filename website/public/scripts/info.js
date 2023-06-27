// Variables for slide transition
const nav = document.getElementById("nav");
const shopNav = document.getElementById("shopNav");
const navigatedFromShop = ["shop.html"];
let navigatedFrom = document.referrer;

// Variable for mobile menu
const menu = document.querySelector(".linkMenu");

// Checks when menu is clicked
menu.addEventListener("click", () => {
    mobileMenu(menu, nav);
});

// Animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    slideTransition(nav, shopNav, navigatedFromShop);
    prerender();
});

// Adds ending part of animation
getLinkIcon(getCurrentNavElement(shopNav), "linkBag").addEventListener(
    "animationend",
    () => {
        animationEndOnNavElements(nav, shopNav);
    }
);
getLinkIcon(getCurrentNavElement(shopNav), "linkCart").addEventListener(
    "animationend",
    () => {
        removeAnimationEndOnNavElements(shopNav);
    }
);

window.addEventListener("scroll", () => {
    displayCopyrightFooter(document.documentElement);
});

window.addEventListener("resize", () => {
    displayCopyrightFooter(document.documentElement);
});
window.addEventListener("orientationChange", () => {
    displayCopyrightFooter(document.documentElement);
});

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll(".arrow");

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
