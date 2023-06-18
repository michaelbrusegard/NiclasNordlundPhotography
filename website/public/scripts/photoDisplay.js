let previouslyFocusedElement = null;

function disableTabbing(event) {
    if (event.keyCode === 9 || (event.key !== "Tab" && event.metaKey)) {
        event.preventDefault();
    }
}

function enableTabbing() {
    document.removeEventListener("keydown", disableTabbing);
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
}

function highlightPhoto(photo) {
    previouslyFocusedElement = document.activeElement;
    document.addEventListener("keydown", disableTabbing);

    const style = getComputedStyle(document.body);

    // Create a new div to hold the highlighted photo
    const highlightDiv = document.createElement("div");
    highlightDiv.style.position = "fixed";
    highlightDiv.style.top = 0;
    highlightDiv.style.left = 0;
    highlightDiv.style.width = "100%";
    highlightDiv.style.height = "100%";
    highlightDiv.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    highlightDiv.style.zIndex = "9999";
    highlightDiv.addEventListener("click", () => {
        document.body.removeChild(highlightDiv);
        enableTabbing();
    });
    highlightDiv.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            document.body.removeChild(highlightDiv);
            enableTabbing();
        }
    });

    // Create a new photo element to display the highlighted photo
    const highlightPhoto = document.createElement("img");
    highlightPhoto.src = photo.src;
    highlightPhoto.style.maxWidth = "90%";
    highlightPhoto.style.maxHeight = "90%";
    highlightPhoto.style.position = "absolute";
    highlightPhoto.style.top = "50%";
    highlightPhoto.style.left = "50%";
    highlightPhoto.style.transform = "translate(-50%, -50%)";
    highlightPhoto.style.borderRadius = style.getPropertyValue(
        "--photoBorderRadius"
    );
    highlightPhoto.style.boxShadow = style.getPropertyValue("--shadow");

    // Set tabindex="0" to make the img element tabbable
    highlightPhoto.setAttribute("tabindex", "0");

    // Add the photo to the highlight div and the highlight div to the document
    highlightDiv.appendChild(highlightPhoto);
    document.body.appendChild(highlightDiv);

    // Focus on the img element when highlightPhoto is called
    highlightPhoto.focus();
}

// Function to handle click and Enter key press events
function handlePhotoClickAndEnter(event, photo) {
    if (event.type === "click" || (event.key === "Enter" && !event.metaKey)) {
        highlightPhoto(photo);
    }
}
