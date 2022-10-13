const linkMenu = document.querySelector('.linkMenu');
const mobileNav = document.querySelector('.mobileNav');
const desktopNav = document.querySelector('.desktopNav');

// Checks for a click on menu button

linkMenu.addEventListener('click', () => {
    linkMenu.classList.toggle('clicked');
    desktopNav.classList.toggle('active');
    mobileNav.classList.toggle('active');
}); 