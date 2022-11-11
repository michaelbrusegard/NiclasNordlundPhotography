
// const fs = require('fs');
// const files = fs.readdirSync('../img/showcase/test');
// console.log(files);

document.addEventListener('DOMContentLoaded', weddingTest());

function weddingTest() {
    let wrap = document.getElementById('test')
    lazyload(wrap)
}

function lazyload(wrapper) {
    files = [ 'wedding1.jpg', 'wedding2.jpg', 'wedding3.jpg' ]
    files.forEach(file => {
        let image = document.createElement('img');
        image.src = 'img/showcase/test' + '/' + file;
        image.loading = 'lazy';
        image.width = image.width;
        image.height = image.height;
        wrapper.appendChild(image)
    })   
}