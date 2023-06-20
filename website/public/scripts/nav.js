// Checks when menu is clicked
function mobileMenu(menu, nav) {
    menu.classList.toggle("clicked");
    nav.children[0].classList.toggle("active");
    nav.children[1].classList.toggle("active");
}

// Starts underline animation when menu is active
function writeUnderline(path) {
    if (menuClick === 0) {
        const parent = path.parentElement;
        // Create a clone of the element
        const clone = path.cloneNode(true);
        // Remove the original element
        parent.removeChild(path);

        // Reinsert the cloned element
        parent.appendChild(clone);
        menuClick++;
    } else {
        menuClick = 0;
    }
}

// Returns the mobile nav element if it is mobile and desktop if it is desktop
function getCurrentNavElement(nav) {
    if (isMobileNav()) {
        return nav.children[0];
    } else {
        return nav.children[1];
    }
}

// Function to remove all child nodes of a parent (credit: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/)
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function replaceNav(newNav, oldNav) {
    // Changes the navigation bar by setting display to none
    oldNav.style.display = "none";
    newNav.style.display = "block";
}

// Function that gets if the anvigation bar is mobile or desktop
function isMobileNav() {
    // Gets the css variable for mobile size
    const style = getComputedStyle(document.body);
    const mobileNavSize = parseInt(
        style.getPropertyValue("--mobileNavSize").slice(0, -2)
    );
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
    let type = "";
    performance.getEntriesByType("navigation").forEach((p) => {
        type = p.type;
    });
    return type;
}

// Get the current year
const currentYearElement = document.getElementById("currentYear");
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

function displayCopyrightFooter(scrollableElement) {
    // Get the current scroll position
    const scrollTop = scrollableElement.scrollTop;

    // Get the total height of the page, including the scrolled portion
    const totalHeight = scrollableElement.scrollHeight;

    // Get the window's inner height
    const windowHeight = scrollableElement.clientHeight;

    // Get the footer container
    const footerContainer = document.querySelector(".footerContainer");

    // Check if the user has scrolled to the bottom
    if (scrollTop + windowHeight >= totalHeight) {
        if (isMobileNav()) {
            footerContainer.style.bottom =
                "calc( 2 * var(--navContainerHeight))";
        } else {
            footerContainer.style.bottom = "var(--navContainerHeight)";
        }
    } else {
        footerContainer.style.bottom = "0";
    }
}
