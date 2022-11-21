// Function to load images and arrange them into columns
function loadImages(files) {

  // Variables
  const totalImages = files.length;
  const columnsMax = getColumns();
  const gallery = document.getElementsByClassName('gallery')[0];

  // Removes all columns
  removeAllChildNodes(gallery);

  // Creates new column
  for (let i = 0; i < columnsMax; i++) {
    const newColumn = document.createElement('div');
    newColumn.classList.add('column');
    gallery.appendChild(newColumn);
  }

  // Gets all the new columns
  const columns = document.getElementsByClassName('column');

  // Variables to skip big photos when placing into columns
  let bigPhotoIndexArray = []; 
  let extraValue = 0;
  let skipBigPhoto = true;

  for (let i = 0; i < totalImages; i++) {
    // Get current image
    const img = createContainer(files[i]);
    // Mark as big photo
    if (files[i][1] < files[i][2]) {
      bigPhotoIndexArray.push(i % columnsMax);
      skipBigPhoto = false;
    }
    // If we are at the big photo index from the previous iteration, go one column further 
    if ((bigPhotoIndexArray.includes(i % columnsMax)) && skipBigPhoto) {
      bigPhotoIndexArray.shift();
      extraValue += 1;
    }
    // Append to column
    columns[(extraValue + i) % columnsMax].appendChild(img);
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

// Function that creates image tags with lazyloading
// Modified lazyload function to adapt to multiple columns
function createContainer(file) {

  // Added creation of a div to hold the images
  let imgDiv = document.createElement('div');
  let image = document.createElement('img');

  // Loads image from showcase, sets alt and lazy
  // Assigning a class to the new div in order for css to be added
  image.src = 'img/showcase/' + file[0];
  image.alt = file[0];
  image.loading = 'lazy';
  imgDiv.classList.add('image');

  // Sets the html height and width so the image takes the same amount of space before it is loaded
  image.width = file[1];
  image.height = file[2];

  // Adds image to the div
  imgDiv.appendChild(image);

  // Add observer for fade on scroll effect
  addImagesFadeOnScroll.observe(imgDiv);

  return imgDiv;
}

// Button that scrolls the window to the top
const scrollTopButtons = document.querySelectorAll('.arrow');

// Eventlistener for scroll-back-to-top button
scrollTopButtons.forEach(el => {
  el.addEventListener('click', event => {
  event.preventDefault();
  document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
})});
