//Using the function for the sport page
//Assigning the end value and editing the start value for the function call to dictate number of images per column
const sport1 = document.getElementsByClassName('column')[0];
const column1Sport = 6;

const sport2 = document.getElementsByClassName('column')[1];
const column2Sport = 11;

const sport3 = document.getElementsByClassName('column')[2];
const column3Sport = 18;


// Runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lazyload('sport', sport1, column1Sport, 1);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('sport', sport2, column2Sport, 7);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('sport', sport3, column3Sport, 12);
});