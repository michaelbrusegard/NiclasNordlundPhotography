function highlightImage(img) {
  // Create a new div to hold the highlighted image
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

  // Create a new img element to display the highlighted image
  const highlightImg = document.createElement('img');
  highlightImg.src = img.src;
  highlightImg.style.maxWidth = '90%';
  highlightImg.style.maxHeight = '90%';
  highlightImg.style.position = 'absolute';
  highlightImg.style.top = '50%';
  highlightImg.style.left = '50%';
  highlightImg.style.transform = 'translate(-50%, -50%)';

  // Add the img to the highlight div and the highlight div to the document
  highlightDiv.appendChild(highlightImg);
  document.body.appendChild(highlightDiv);
}

