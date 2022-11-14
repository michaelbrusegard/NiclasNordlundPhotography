// Function that creates image tags with lazyloading and adds them to the wrapper
// Modified lazyload function to adapt to multiple columns
function lazyload(file) {

  // Runs for the amount of pictures specified
  // Added creation of a div to hold the images
  let imgDiv = document.createElement('div');
  let image = document.createElement('img');

  // Loads image from showcase, sets alt and lazy
  // Assigning a class to the new div in order for css to be added
  image.src = 'img/showcase/' + file[0];
  image.alt = file[0];
  image.loading = 'lazy';
  imgDiv.classList.add("image");

  // Sets the html height and width so the image takes the same amount of space before it is loaded
  image.width = file[1];
  image.height = file[2];

  // Adds image to the div
  // Adds the div to the column
  imgDiv.appendChild(image);

  return imgDiv;
}