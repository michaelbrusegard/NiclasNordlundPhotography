function highlightPhoto(photo) {
<<<<<<< HEAD
=======
    const style = getComputedStyle(document.body);
>>>>>>> c020d31 (Changed to .env, added fetches and env deploy)
    // Create a new div to hold the highlighted photo
    const highlightDiv = document.createElement('div');
    highlightDiv.style.position = 'fixed';
    highlightDiv.style.top = 0;
    highlightDiv.style.left = 0;
    highlightDiv.style.width = '100%';
    highlightDiv.style.height = '100%';
    highlightDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    highlightDiv.style.zIndex = '9999';
    highlightDiv.addEventListener('click', () => {
        document.body.removeChild(highlightDiv);
    });

    // Create a new photo element to display the highlighted photo
    const highlightPhoto = document.createElement('img');
    highlightPhoto.src = photo.src;
    highlightPhoto.style.maxWidth = '90%';
    highlightPhoto.style.maxHeight = '90%';
    highlightPhoto.style.position = 'absolute';
    highlightPhoto.style.top = '50%';
    highlightPhoto.style.left = '50%';
    highlightPhoto.style.transform = 'translate(-50%, -50%)';
<<<<<<< HEAD
=======
    highlightPhoto.style.borderRadius = style.getPropertyValue(
        '--photoBorderRadius'
    );
    highlightPhoto.style.boxShadow = style.getPropertyValue('--shadow');
>>>>>>> c020d31 (Changed to .env, added fetches and env deploy)

    // Add the photo to the highlight div and the highlight div to the document
    highlightDiv.appendChild(highlightPhoto);
    document.body.appendChild(highlightDiv);
}
