function setNiclasLeftPos() {
  const niclasPhoto = document.getElementById('niclasPhoto');
  // Gets the screen width
  const screenWidth = window.innerWidth;

  // Get nav bar size
  const desktopNavSize = parseInt(
    style.getPropertyValue('--desktopNavSize').slice(0, -2)
  );

  const photoWidth = niclasPhoto.clientWidth;
  // Calculate and set value
  const niclasLeftPxBig =
    desktopNavSize - photoWidth / 2 + (screenWidth - desktopNavSize) / 2;
  const niclasLeftPxSmall = screenWidth / 2 - photoWidth / 2;

  // Sets photo position based on screen size and orientation
  if (screenWidth > desktopNavSize + photoWidth) {
    niclasPhoto.style.left = String(niclasLeftPxBig) + 'px';
  } else if (isMobileNav() && isPortraitOrientation()) {
    niclasPhoto.style.left = String(niclasLeftPxSmall) + 'px';
  } else {
    niclasPhoto.style.left = 'auto';
  }
}

// Finds out if the orientation landscape or portrait
function isPortraitOrientation() {
  const orientation = window.innerWidth > window.innerHeight ? false : true;
  return orientation;
}
