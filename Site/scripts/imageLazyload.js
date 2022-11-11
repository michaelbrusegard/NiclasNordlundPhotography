
function lazyload(label, wrapper) {
  for (i = 1; i < 10; i++) { 
      let image = document.createElement('img');
      image.src = 'img/showcase/' + label + i + '.jpg';
      image.alt = label;
      image.loading = 'lazy';
      image.width = image.width;
      image.height = image.height;
      wrapper.appendChild(image)
    }
}