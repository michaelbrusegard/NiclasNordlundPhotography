// Gets the different elements in the navigation bar and stores them as variables
const linkBag = document.querySelectorAll('.linkBag');
const linkSignature = document.querySelectorAll('.linkSignature');
const linkText = document.querySelectorAll('.linkText');
const linkCart = document.querySelectorAll('.linkCart');

// Runs when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Gets the link the page is navigated from
    const navigatedFrom = document.referrer

    // Checks if the link that is navigated from is one of the other html pages
    if (navigatedFrom.endsWith('home.html') || 
    navigatedFrom.endsWith('nature.html') || 
    navigatedFrom.endsWith('animals.html') || 
    navigatedFrom.endsWith('architectural.html') || 
    navigatedFrom.endsWith('portrait.html') || 
    navigatedFrom.endsWith('sport.html') || 
    navigatedFrom.endsWith('wedding.html')) {

        history.pushState(str, "", "shop.html");
        // Runs the animation for the old navigation bar
        let oldNav = mobileOrDesktopNav() + 2
        linkBag[oldNav].classList.add('linkBagAnimation')
        linkSignature[oldNav].classList.add('fadeOutAnimation')

        // Checks different if it is desktop or mobile to know which elements need animation
        if (oldNav === 2) {
            linkMenu.classList.add('fadeOutAnimation')
        } else {
            // Go through the text elements in the desktop navigation bar
            linkText.forEach((link) => {
                // Set it to visible before running the animation (It is invisible to stop it from showing up in preloading)
                link.style.visibility = 'visible'
                link.classList.add('fadeOutAnimation')
            })
        }
    } else {
        // Refresh Navigation bar sicne it is not coming from one of the other html pages and the animation is cancelled
        refreshNav()
    }
});

// When the bag icon animation end
linkBag[mobileOrDesktopNav() + 2].addEventListener('animationend', () => {
    // Replaces the navigation bar
    refreshNav()
    let newNav = mobileOrDesktopNav()
    // Initiates fade in animation for the elements in the new navigation bar
    linkSignature[newNav].classList.add('fadeInAnimation')
    linkCart[newNav].classList.add('fadeInAnimation')
}); 

// Runs when the cart animation is done aka when all animations are completely done
linkCart[mobileOrDesktopNav()].addEventListener('animationend', () => {
    let newNav = mobileOrDesktopNav()
    // Removes the fade in animation so it does not run unintentionally
    linkSignature[newNav].classList.remove('fadeInAnimation')
    linkCart[newNav].classList.remove('fadeInAnimation')
}); 

// Gets the navigation bars as variables
const oldNav = document.getElementsByClassName('oldNav')[0];
const shopNav = document.getElementsByClassName('shopNav')[0];

function refreshNav() {
    // Changes the navigation bar by setting display to none
    oldNav.style.display = 'none';
    shopNav.style.display = 'block';
}

// Function that gets if the anvigation bar is mobile or desktop
function mobileOrDesktopNav() {
    // Gets the css variable for mobile size
    const style = getComputedStyle(document.body)
    const mobileNavSize = parseInt(style.getPropertyValue('--mobileNavSize').slice(0, -2));
    // Gets the sreen width
    const screenWidth = window.innerWidth
    // Compares screen width to the mobile size
    if (mobileNavSize > screenWidth) {
        return 0
    } else {
        return 1
    }
}