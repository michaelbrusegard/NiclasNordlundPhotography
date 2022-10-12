const linkMenu = document.querySelector('.linkMenu');
let menuClicked = false;

// Checks for a click on menu button

linkMenu.addEventListener('click', () => {
    if (!menuClicked) {
        linkMenu.classList.add('clicked');
        menuClicked = true;
    } else {
        linkMenu.classList.remove('clicked');
        menuClicked = false;
    }
}); 