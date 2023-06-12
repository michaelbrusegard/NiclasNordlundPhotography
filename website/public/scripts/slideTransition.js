function slideTransition(newNav, oldNav, navigatedFromArray) {
    if (isNavigatedFrom(navigatedFromArray)) {
        // Start animation with the old navigation bar
        animationStartOnNavElements(getCurrentNavElement(oldNav));
    } else {
        // Refresh Navigation bar since it is not coming from one of the other html pages and the animation is cancelled
        replaceNav(newNav, oldNav);
    }
}

// Function to go through array and check if it is navigated from
function isNavigatedFrom(navigatedFromArray) {
    // Gets the link the page is navigated from
    let lastSite = navigatedFrom;

    // If the page is reloaded asigns navigatedFrom to something else to avoid playing the animation
    if (getNavigationType() === "reload") {
        lastSite = "";
    }

    // Checks if the link that is navigated from is one of the array html pages
    for (let i = 0; i < navigatedFromArray.length; i++) {
        if (lastSite.endsWith(navigatedFromArray[i])) {
            return true;
        }
    }
    return false;
}

function animationStartOnNavElements(nav) {
    // For all elements inside current nav
    for (let i = 0; i < nav.childElementCount; i++) {
        const navElement = nav.children[i];
        // Set the elements in the old navigation bar to visible (They are default hidden to prevent popping on fast refresh)
        navElement.firstElementChild.style.visibility = "visible";
        // Add bag icon animation and animation to the rest of the elements
        if (navElement.firstElementChild.className.endsWith("linkBag")) {
            navElement.firstElementChild.classList.add("linkBagAnimation");
        } else {
            navElement.firstElementChild.classList.add("fadeOutAnimation");
        }
    }
}

function animationEndOnNavElements(newNav, oldNav) {
    // Replace navigation bar since animation is done
    replaceNav(newNav, oldNav);
    const nav = getCurrentNavElement(newNav);
    // For all elements inside current nav
    for (let i = 0; i < nav.childElementCount; i++) {
        const navElement = nav.children[i];
        // Add a fade in animation except for bag icon
        if (!navElement.firstElementChild.className.endsWith("linkBag")) {
            navElement.firstElementChild.classList.add("fadeInAnimation");
        }
    }
}

function removeAnimationEndOnNavElements(newNav) {
    const nav = getCurrentNavElement(newNav);
    // For all elements inside current nav
    for (let i = 0; i < nav.childElementCount; i++) {
        const navElement = nav.children[i];
        // Remove fade in animation except for bag icon
        if (!navElement.firstElementChild.className.endsWith("linkBag")) {
            navElement.firstElementChild.classList.remove("fadeInAnimation");
        }
    }
}

// Returns the link icon that currently runs the animation
function getLinkIcon(nav, name) {
    // For all elements inside current nav
    for (let i = 0; i < nav.childElementCount; i++) {
        const navElement = nav.children[i];
        // Check if it is linkicon
        if (navElement.firstElementChild.className.endsWith(name)) {
            return navElement.firstElementChild;
        }
    }
}

// Redirects to last link if it was on the site
function redirectToLastLink(navigatedFromArray) {
    let cameFromSite = false;
    // Checks if navigatedFrom is in the array
    for (let i = 0; i < navigatedFromArray.length; i++) {
        if (navigatedFrom.endsWith(navigatedFromArray[i])) {
            cameFromSite = true;
        }
    }
    if (cameFromSite) {
        // Redirects to last page
        const splittedLink = navigatedFrom.split("/");
        const lastPage = navigatedFrom.split("/")[splittedLink.length - 1];
        window.location.href = lastPage;
    } else {
        // Redirects to home
        window.location.href = "home.html";
    }
}
