// Function to run the carousel
function initialisePhotoCarousel() {
    // Display the first photo and start the timer
    newPhoto(photoDisplayed);
    let timer = setInterval(function () {
        swapPhoto();
    }, intervalTime);
    // Checking for clicks on carousel
    photoCarousel.addEventListener("click", () => {
        // Restarting the timer and runnign the photo swapping function
        clearInterval(timer);
        swapPhoto();
        timer = setInterval(function () {
            swapPhoto();
        }, 1.5 * intervalTime);
    });
}

// Function to swap photos
function swapPhoto() {
    // Removes current imaphotoge
    removePhoto(photoDisplayed);
    // Sets the next photo
    photoDisplayed += 1;
    if (photoDisplayed >= photos.length) {
        photoDisplayed = 0;
    }
    // Displays new photo
    newPhoto(photoDisplayed);
}

// Displaying a new photo
function newPhoto(index) {
    // Mark the photo as visible and toggle animation
    photos[index].style.visibility = "visible";
    photos[index].classList.add("photoIn");
    // Remove animation after it is finished running
    photos[index].addEventListener(
        "animationend",
        () => {
            photos[index].classList.remove("photoIn");
        },
        { once: true }
    );
}

function removePhoto(index) {
    // Toggle the out animation
    photos[index].classList.add("photoOut");
    // When animation is done set it to hidden and remove animation
    photos[index].addEventListener(
        "animationend",
        () => {
            photos[index].classList.remove("photoOut");
            photos[index].style.visibility = "hidden";
        },
        { once: true }
    );
}

// Function to adjust the photos position
function carouselPhotoPosition() {
    // Size variables
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const navContainerHeight = parseInt(
        style.getPropertyValue("--navContainerHeight").slice(0, -2)
    );

    // Padding
    const generalWidthPadding = String(0.05 * windowWidth) + "px";
    const generalHeightPadding =
        String(0.05 * windowHeight + navContainerHeight) + "px";
    const specialWidthPadding = String(0.4 * windowWidth) + "px";
    const specialHeightPadding =
        String(0.4 * windowHeight + navContainerHeight) + "px";
    // For every photo
    photos.forEach((photo) => {
        // Change the padding based on if it is portrait or landscape
        if (isPortraitOrientation()) {
            photo.style.paddingLeft = generalWidthPadding;
            photo.style.paddingRight = generalWidthPadding;
            photo.style.paddingBottom = specialHeightPadding;
            photo.style.paddingTop = generalHeightPadding;
        } else {
            photo.style.paddingLeft = generalWidthPadding;
            photo.style.paddingRight = specialWidthPadding;
            photo.style.paddingBottom = generalHeightPadding;
            photo.style.paddingTop = generalHeightPadding;
        }
    });
}
