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

// Function to remove all child nodes of a parent
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}