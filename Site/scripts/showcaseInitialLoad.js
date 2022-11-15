// Function to load images and arrange them into columns
function initialLoad(files) {

  // Variables
  const totalImages = files.length;
  const columns = document.getElementsByClassName('column');
  const columnsMax = getColumns();

  // Removes all images from columns
  for (let i = 0; i < columns.length; i++) {
    removeAllChildNodes(columns[i]);
  }

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