//Using the function for the portrait page
const portrait1 = document.getElementsByClassName('column')[0];
const column1Portrait = 5;

const portrait2 = document.getElementsByClassName('column')[1];
const column2Portrait = 11;

const portrait3 = document.getElementsByClassName('column')[2];
const column3Portrait = 16;

document.addEventListener('DOMContentLoaded', () => {
    lazyload('portrait', portrait1, column1Portrait, 1);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('portrait', portrait2, column2Portrait, 6);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('portrait', portrait3, column3Portrait, 12);
});