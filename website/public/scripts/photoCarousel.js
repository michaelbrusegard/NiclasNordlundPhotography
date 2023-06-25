async function getPhotos() {
    const photoCarouselBucket = await getPhotoCarouselBucket();
    const files = await fetchBucketData(photoCarouselBucket);
    files.forEach((filename) => {
        let img = document.createElement("img");
        img.src = `https://storage.googleapis.com/${photoCarouselBucket}/${filename}`;
        img.alt = filename;
        photoCarousel.appendChild(img);
    });
    return document.querySelectorAll("#photoCarousel img");
}

// Function to run the carousel
async function initialisePhotoCarousel() {
    // Get the photos
    const photos = await getPhotos();
    // Display the first photo and start the timer
    newPhoto(photoDisplayed, photos);
    let timer = setInterval(function () {
        swapPhoto(photos);
    }, intervalTime);
    // Checking for clicks on carousel
    photoCarousel.addEventListener("click", () => {
        // Restarting the timer and runnign the photo swapping function
        clearInterval(timer);
        swapPhoto(photos);
        timer = setInterval(function () {
            swapPhoto(photos);
        }, 1.5 * intervalTime);
    });
}

// Function to swap photos
function swapPhoto(photos) {
    // Removes current imaphotoge
    removePhoto(photoDisplayed, photos);
    // Sets the next photo
    photoDisplayed += 1;
    if (photoDisplayed >= photos.length) {
        photoDisplayed = 0;
    }
    // Displays new photo
    newPhoto(photoDisplayed, photos);
}

// Displaying a new photo
function newPhoto(index, photos) {
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

function removePhoto(index, photos) {
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
