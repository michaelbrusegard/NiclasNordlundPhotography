const linkMenu = document.querySelector('.linkMenu');
const desktopNav = document.querySelector('.desktopNav');
let menuClicked = false;

// Checks for a click on menu button

linkMenu.addEventListener('click', () => {
    if (!menuClicked) {
        linkMenu.classList.add('clicked');
        desktopNav.classList.add('active');
        menuClicked = true;
    } else {
        linkMenu.classList.remove('clicked');
        desktopNav.classList.remove('active');
        menuClicked = false;
    }
}); 