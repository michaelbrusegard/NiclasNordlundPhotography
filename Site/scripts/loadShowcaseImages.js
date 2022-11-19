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

  // Adds all images into correct columns based on how many columns there should be and which one is the shortest
  for (let i = 0; i < totalImages; i++) {
    const img = createContainer(files[i]);
    const shortestColumn = findShortestColumn(columns);
    console.log(shortestColumn);
    columns[shortestColumn].appendChild(img);
  }
}

// Finds the shortest column
function findShortestColumn(columns) {
  let shortestColumn = 0;
  // For every column
  for (let i = 0; i < columns.length; i++) {
    const columnHeight = calculateColumnHeight(columns[i]);
    const shortestColumnHeight = calculateColumnHeight(columns[shortestColumn]);
    // Compares current column size to the shortest one and if it is shorter set it as the shortest column
    if (columnHeight < shortestColumnHeight) {
      shortestColumn = i;
    }
  }
  return shortestColumn;
}

// Calculates the column height using image height
function calculateColumnHeight(column) {
  let columnHeight = 0;
  for (let i = 0; i < column.childElementCount; i++) {
    console.log(`Image width: ${files[i][1]}`);
    console.log(`Image height: ${files[i][2]}`);
    console.log(`Column height: ${columnHeight} before`);
    columnHeight += files[i][2];
    console.log(`Column height: ${columnHeight} after`);
  }
  return columnHeight;
}

/*
// Calculates the column height using image height
function calculateColumnHeight(column) {
  console.log(column);
  let columnHeight = 0;
  let index = 0;
  column.childNodes.forEach(el => {
    const rect = el.getBoundingClientRect();
    console.log(rect);
    const ratio = (rect.left - rect.right) / files[index][1];
    const imageHeight = ratio * files[index][2];
    console.log(`imageheight: ${imageHeight}`);
    columnHeight +=  imageHeight;
    console.log(`columnheight: ${columnHeight}`)
    index += 1;
  });
  return columnHeight;
}
*/

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
