// Function that creates image tags with lazyloading and adds them to the wrapper
function lazyload(label, wrapper, end, start = 1) {

  // Runs for the amount of pictures specified
  for (i = start; i <= end; i++) {
    let image = document.createElement('img');

    // Loads image from showcase, sets alt and lazy
    image.src = 'img/showcase/' + label + i + '.jpg';
    image.alt = label;
    image.loading = 'lazy';

    // Sets the html height and width so the image takes the same amount of space before it is loaded
    image.width = image.width;
    image.height = image.height;

    // Adds image to the wrapper
    wrapper.appendChild(image);
  }
}