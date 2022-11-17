// Function to load images and arrange them into columns
function initialLoad(files) {

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
    const img = lazyload(files[i]);
    columns[shortestColumn(columns)].appendChild(img);
  }
}

// Finds the shortest column
function shortestColumn(columns) {
  let shortestColumn = 0;
  // For every column
  for (let i = 0; i < columns.length; i++) {
    const columnHeight = getColumnHeight(columns[i]);
    const shortestColumnHeight = getColumnHeight(columns[shortestColumn]);
    // Compares current column size to the shortest one and if it is shorter set it as the shortest column
    if (columnHeight < shortestColumnHeight) {
      shortestColumn = i;
    }
  }
  return shortestColumn;
}

// Calculates the column height using image height
function getColumnHeight(column) {
  let columnHeight = 0;
  for (let i = 0; i < column.childElementCount; i++) {
    columnHeight += column.childNodes[i].firstChild.height;
  }
  return columnHeight;
}

// Gets how many columns there is space for
function getColumns() {
  const windowWidth = window.innerWidth;
  const columns = Math.floor(windowWidth / columnSize);
  if (columns === 0) {
    return 1;
  } else if (columns > maxColumns) {
    return maxColumns;
  } else {
    return columns;
  }
}