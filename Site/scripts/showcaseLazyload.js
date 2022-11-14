// Function that creates image tags with lazyloading and adds them to the wrapper
// Modified lazyload function to adapt to multiple columns
function lazyload(files, wrapper, end, start = 1) {

  // Runs for the amount of pictures specified
  // Added creation of a div to hold the images
  for (i = start; i <= end; i++) {
    let imgDiv = document.createElement('div');
    let image = document.createElement('img');

    // Loads image from showcase, sets alt and lazy
    // Assigning a class to the new div in order for css to be added
    image.src = 'img/showcase/' + files[i][0];
    image.alt = files[i][0];
    image.loading = 'lazy';
    imgDiv.classList.add("image");

    // Sets the html height and width so the image takes the same amount of space before it is loaded
    image.width = files[i][1];
    image.height = files[i][2];

    // Adds image to the div
    // Adds the div to the column
    imgDiv.appendChild(image);
    wrapper.appendChild(imgDiv);
  }
}