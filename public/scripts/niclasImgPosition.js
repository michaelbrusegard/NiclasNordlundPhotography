function getNiclasLeftPx() {
    const niclasImg = document.getElementById('niclasImg');
    // Gets the screen width
    const screenWidth = window.innerWidth;

    // Get nav bar size
    const desktopNavSize = parseInt(style.getPropertyValue('--desktopNavSize').slice(0, -2));

    const imgWidth = niclasImg.clientWidth;
    // Calculate and set value
    const niclasLeftPxBig = desktopNavSize - imgWidth / 2 + (screenWidth - desktopNavSize) / 2;
    const niclasLeftPxSmall = screenWidth / 2 - imgWidth / 2

    // Sets image postiion based on screen size and orientation
    if (screenWidth > (desktopNavSize + imgWidth)) {
        niclasImg.style.left = String(niclasLeftPxBig) + 'px';
    } else if (isMobileNav() && isPortraitOrientation()) {
        niclasImg.style.left = String(niclasLeftPxSmall) + 'px';
    } else {
        niclasImg.style.left = 'auto';
    }
}

// Finds out if the orientation landscape or portrait
function isPortraitOrientation(){
    const orientation = window.innerWidth > window.innerHeight ? false : true;
    return orientation;
}