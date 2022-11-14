const files = [["nature1.jpg",1700,1009],["nature10.jpg",1700,904],["nature11.jpg",1700,956],["nature12.jpg",1700,1074],["nature13.jpg",1200,1200],["nature14.jpg",1680,1200],["nature15.jpg",1700,1062],["nature16.jpg",1700,1133],["nature17.jpg",1133,1700],["nature2.jpg",1680,1200],["nature3.jpg",1700,1063],["nature4.jpg",1700,956],["nature5.jpg",1700,1063],["nature6.jpg",1700,1133],["nature7.jpg",1700,904],["nature8.jpg",1700,744],["nature9.jpg",1700,1063]]
const columnSize = 384 * 1.5
const maxColumns = 3

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => initialLoad(files));
window.addEventListener('resize', () => initialLoad(files));
window.addEventListener('orientationChange', () => initialLoad(files));