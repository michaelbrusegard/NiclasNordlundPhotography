// Checks when menu is clicked
function mobileMenu(menu, nav) {
  menu.classList.toggle('clicked');
  nav.children[0].classList.toggle('active');
  nav.children[1].classList.toggle('active');
}

// Returns the mobile nav element if it is mobile and desktop if it is desktop
function getCurrentNavElement(nav) {
  if (isMobileNav()) {
      return nav.children[0]
  } else {
      return nav.children[1]
  }
}

// Function to remove all child nodes of a parent
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function replaceNav(newNav, oldNav) {
  // Changes the navigation bar by setting display to none
  oldNav.style.display = 'none';
  newNav.style.display = 'block';
}

// Function that gets if the anvigation bar is mobile or desktop
function isMobileNav() {
  // Gets the css variable for mobile size
  const style = getComputedStyle(document.body);
  const mobileNavSize = parseInt(style.getPropertyValue('--mobileNavSize').slice(0, -2));
  // Gets the screen width
  const screenWidth = window.innerWidth;
  // Compares screen width to the mobile size
  if (mobileNavSize > screenWidth) {
      return true;
  } else {
      return false;
  }
}

// Function to get the navigation type
function getNavigationType() {
  let type = '';
  performance.getEntriesByType('navigation').forEach((p) => {
      type = p.type;
  });
  return type;
}