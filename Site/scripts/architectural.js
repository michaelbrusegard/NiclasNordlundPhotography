//Using the function for the architectural page
//Assigning the end value and editing the start value for the function call to dictate number of images per column

const files = [["architectural1.jpg",1700,1063],["architectural10.jpg",1700,1105],["architectural11.jpg",1680,1200],["architectural12.jpg",1700,1063],["architectural13.jpg",1700,1106],["architectural14.jpg",1700,1062],["architectural15.jpg",1700,956],["architectural16.jpg",1700,1063],["architectural17.jpg",1700,1000],["architectural18.jpg",1700,956],["architectural19.jpg",1700,1063],["architectural2.jpg",1200,1600],["architectural3.jpg",1700,1133],["architectural4.jpg",1700,907],["architectural5.jpg",1700,1190],["architectural6.jpg",1700,956],["architectural7.jpg",1700,956],["architectural8.jpg",1700,956],["architectural9.jpg",1680,1200]]

const architectural1 = document.getElementsByClassName('column')[0];
const column1Architectural = 6;

const architectural2 = document.getElementsByClassName('column')[1];
const column2Architectural = 12;

const architectural3 = document.getElementsByClassName('column')[2];
const column3Architectural = 19;


// Runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lazyload(files, architectural1, column1Architectural);
    lazyload(files, architectural2, column2Architectural, 7);
    lazyload(files, architectural3, column3Architectural, 13);
});

