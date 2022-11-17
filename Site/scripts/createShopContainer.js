// Function that creates the div container for the shop
function createContainer(pricesArray) {

    // Images
    let img = document.createElement('img');
    img.src = 'img/shopDisplayImages/' + pricesArray[0];
    img.loading = 'lazy';
    img.alt = pricesArray[0];
    img.classList.add('images');

    // Price
    let h2 = document.createElement('h2');
    h2.textContent = pricesArray[1] + '€';
    h2.classList.add('price');

    // Name
    let p = document.createElement('p');
    p.textContent = pricesArray[0];
    p.classList.add('name');

    // Container
    let div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.classList.add('container');
    gridWrapper.appendChild(div);

    // Apply checkout system interaction to the div item
    div.addEventListener('click', () => { checkoutSystem(div, parseInt(pricesArray[1])); });
}