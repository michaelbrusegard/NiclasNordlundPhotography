//Using the function for the animals page
//Assigning the end value and editing the start value for the function call to dictate number of images per column
const animals1 = document.getElementsByClassName('column')[0];
const column1Animals = 6;

const animals2 = document.getElementsByClassName('column')[1];
const column2Animals = 12;

const animals3 = document.getElementsByClassName('column')[2];
const column3Animals = 19;


// Runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lazyload('animals', animals1, column1Animals);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('animals', animals2, column2Animals, 7);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('animals', animals3, column3Animals, 12);
});