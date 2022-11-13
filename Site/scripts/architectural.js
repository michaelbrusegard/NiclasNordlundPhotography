//Using the function for the architectural page
//Assigning the end value and editing the start value for the function call to dictate number of images per column
const architectural1 = document.getElementsByClassName('column')[0];
const column1Architectural = 6;

const architectural2 = document.getElementsByClassName('column')[1];
const column2Architectural = 12;

const architectural3 = document.getElementsByClassName('column')[2];
const column3Architectural = 19;


// Runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lazyload('architectural', architectural1, column1Architectural);
    lazyload('architectural', architectural2, column2Architectural, 7);
    lazyload('architectural', architectural3, column3Architectural, 13);
});

