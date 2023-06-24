// Function to get image dimensions
function getImageDimensions(bucket, filename) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
            const dimensions = {
                width: img.width,
                height: img.height,
            };
            resolve(dimensions);
        };
        img.onerror = function () {
            const dimensions = {
                width: 0,
                height: 0,
            };
            resolve(dimensions);
        };
        img.src = `https://storage.googleapis.com/${bucket}/${filename}`;
    });
}

// Function to load photos and arrange them into columns
async function loadPhotos() {
    const showcasePhotosBucket = await getShowcasePhotosBucket(page);
    const files = await fetchBucketData(showcasePhotosBucket);

    // Variables
    const totalPhotos = files.length;
    const columnsMax = getColumns();
    const gallery = document.querySelector(".gallery");

    // Removes all columns
    removeAllChildNodes(gallery);

    // Creates new column
    for (let i = 0; i < columnsMax; i++) {
        const newColumn = document.createElement("div");
        newColumn.classList.add("column");
        gallery.appendChild(newColumn);
    }

    // Gets all the new columns
    const columns = document.getElementsByClassName("column");

    // Variables to skip big photos when placing into columns
    let bigPhotoIndexArray = [];
    let extraValue = 0;
    let skipBigPhoto = true;

    for (let i = 0; i < totalPhotos; i++) {
        // Get current photo dimensions
        const dimensions = await getImageDimensions(
            showcasePhotosBucket,
            files[i]
        );

        // Get current photo
        const photo = createContainer(
            showcasePhotosBucket,
            files[i],
            dimensions,
            i
        );
        // Mark as big photo
        if (dimensions.width < dimensions.height) {
            bigPhotoIndexArray.push(i % columnsMax);
            skipBigPhoto = false;
        }
        // If we are at the big photo index from the previous iteration, go one column further
        if (bigPhotoIndexArray.includes(i % columnsMax) && skipBigPhoto) {
            bigPhotoIndexArray.shift();
            extraValue += 1;
        }
        // Append to column
        columns[(extraValue + i) % columnsMax].appendChild(photo);
        skipBigPhoto = true;
    }
}

// Calculate how many columns there is space for
function getColumns() {
    const windowWidth = window.innerWidth;
    const columns = Math.floor(windowWidth / columnSize);
    if (columns === 0) {
        return 1;
    } else if (columns >= maxNumberColumns) {
        return maxNumberColumns;
    } else {
        return columns;
    }
}

// Function that creates photo tags with lazyloading
// Modified lazyload function to adapt to multiple columns
function createContainer(showcasePhotosBucket, filename, dimensions, index) {
    // Added creation of a div to hold the photos
    let div = document.createElement("div");
    let img = document.createElement("img");

    // Loads photos from showcase, sets alt and lazy
    // Assigning a class to the new div in order for css to be added
    img.src = `https://storage.googleapis.com/${showcasePhotosBucket}/${filename}`;
    img.alt = filename;
    img.loading = "lazy";
    div.classList.add("photo");

    // Sets the html height and width so the photo takes the same amount of space before it is loaded
    img.width = dimensions.width;
    img.height = dimensions.height;

    // Adds photo to the div
    div.appendChild(img);

    // Add observer for fade on scroll effect
    addPhotosFadeOnScroll.observe(div);

    // Attach event listeners to the div element
    div.addEventListener("click", (event) =>
        handlePhotoClickAndEnter(event, img)
    );
    div.addEventListener("keydown", (event) =>
        handlePhotoClickAndEnter(event, img)
    );

    // Set logical tabindex for photo order
    div.tabIndex = index + 1;

    return div;
}

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll(".arrow");

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach((element) => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
