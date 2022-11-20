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
    // For every image
    images.forEach(image => {
        // Change the padding based on if it is portrait or landscape
        if (isPortraitOrientation()) {
            image.style.paddingLeft = "2%";
            image.style.paddingRight = "4%";
            image.style.paddingBottom = "50%";
            image.style.paddingTop = "5%";
        } else {
            image.style.paddingLeft = "5%";
            image.style.paddingRight = "30%";
            image.style.paddingBottom = "4%";
            image.style.paddingTop = "2%";
        }
    });
}