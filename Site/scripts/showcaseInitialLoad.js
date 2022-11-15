// Function to load images and arrange them into columns
function initialLoad(files) {

  // Variables
  const totalImages = files.length;
  const columnsMax = getColumns();
  const gallery = document.getElementsByClassName('gallery')[0];

  // Removes all columns
  for (let i = 0; i < columnsMax; i++) {
    removeAllChildNodes(gallery)
  }

  // Creates new column
  for (let i = 0; i < columnsMax; i++) {
    const newColumn = document.createElement('div');
    newColumn.classList.add('column');
    gallery.appendChild(newColumn);
  }

  // Gets all the new columns
  const columns = document.getElementsByClassName('column');

  // Adds all images into correct columns based on how many columns there should be
  for (let i = 0; i < totalImages; i++) {
    let img = lazyload(files[i]);
    columns[i % columnsMax].appendChild(img);
  }
}

// Gets how many columns there is space for
function getColumns() {
  const windowWidth = window.innerWidth;
  const columns = Math.floor(windowWidth / columnSize)
  if (columns === 0) {
    return 1
  } else if (columns > maxColumns) {
    return maxColumns
  } else {
    return columns
  }
}