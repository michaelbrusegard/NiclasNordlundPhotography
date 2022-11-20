// Function to run the carousel
function imageCarousel() {
    // Display the first image and start the timer
    newImage(imageDisplayed);
    let timer = setInterval(function () { autoImage(); }, intervalTime);
    // Checking for clicks on image daddy
    imageDaddy.addEventListener('click', () => {
        // Restarting the timer and runnign the image swapping function
        clearInterval(timer);
        autoImage();
        timer = setInterval(function () { autoImage(); }, intervalTime);
    });
}

// Function to swap images
function autoImage() {
    // Removes current image
    removeImage(imageDisplayed);
    // Sets the next image
    imageDisplayed += 1;
    if (imageDisplayed >= images.length) {
        imageDisplayed = 0;
    }
    // Displays new image
    newImage(imageDisplayed);
}

// Displaying a new image
function newImage(index) {
    // Mark the image as visible and toggle animation
    images[index].style.visibility = "visible";
    images[index].classList.add("imageIn");
    // Remove animation after it is finished running
    images[index].addEventListener("animationend", () => {
        images[index].classList.remove("imageIn");
    }, { once: true });
}

function removeImage(index) {
    // Toggle the out animation
    images[index].classList.add("imageOut");
    // When animation is done set it to hidden and remove animation
    images[index].addEventListener("animationend", () => {
        images[index].classList.remove("imageOut");
        images[index].style.visibility = "hidden";
    }, { once: true });
}

// Function to adjust the images position
function imagePosition() {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    // For every image
    images.forEach(image => {
        // Change the style based on if it is portrait or landscape
        if (isPortraitOrientation()) {
            image.style.top = "5%";
            image.style.left = "2%";
            image.style.height = String(0.8 * windowHeight - 120) + "px";
            image.style.width = String(0.9 * windowWidth - 120) + "px";
        } else {
            image.style.top = "2%";
            image.style.left = "5%";
            image.style.height = String(0.9 * windowHeight - 120) + "px";
            image.style.width = String(0.8 * windowWidth - 120) + "px";
        }
    });
}