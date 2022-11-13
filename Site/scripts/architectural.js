//Using the function for the architectural page
const architectural1 = document.getElementsByClassName('column')[0];
const column1Architectural = 6;

const architectural2 = document.getElementsByClassName('column')[1];
const column2Architectural = 12;

const architectural3 = document.getElementsByClassName('column')[2];
const column3Architectural = 19;

document.addEventListener('DOMContentLoaded', () => {
    lazyload('architectural', architectural1, column1Architectural);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('architectural', architectural2, column2Architectural, 7);
});

document.addEventListener('DOMContentLoaded', () => {
    lazyload('architectural', architectural3, column3Architectural, 13);
});