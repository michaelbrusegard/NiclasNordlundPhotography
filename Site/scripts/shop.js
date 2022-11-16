// When the DOM is done loading: loads new image containers and aligns checkout menu
document.addEventListener('DOMContentLoaded', () => {
    windowLoad();
    alignCheckout();
});

// Changes to the window: loads new image containers and aligns checkout menu
window.addEventListener("scroll", () => {
    scrollLoad();
});
window.addEventListener("resize", () => {
    windowLoad();
    alignCheckout();
});
window.addEventListener("orientationChange", () => {
    windowLoad();
    alignCheckout();
});

// Checks for clicks on the shopping cart icon to toggle the checkout menu
cartButtons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault();
    checkoutMenu.classList.toggle('active');
}));

// Eventlistener for scroll-back-to-top button
const scrollTopButton = document.getElementById('arrow');
scrollTopButton.addEventListener('click', event => {
    event.preventDefault();
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
