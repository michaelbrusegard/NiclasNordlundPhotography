const files = [["sport1.jpg",1600,1200],["sport10.jpg",1600,1200],["sport11.jpg",1700,956],["sport12.jpg",1700,956],["sport13.jpg",1700,1062],["sport14.jpg",1700,956],["sport15.jpg",1700,956],["sport16.jpg",1700,1133],["sport17.jpg",1600,1200],["sport18.jpg",1700,850],["sport2.jpg",1700,956],["sport3.jpg",1700,1062],["sport4.jpg",1700,1062],["sport5.jpg",1680,1200],["sport6.jpg",1700,1062],["sport7.jpg",1700,1062],["sport8.jpg",1600,1200],["sport9.jpg",1700,1133]]
const columnSize = 384
const maxColumns = 5

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => initialLoad(files));
window.addEventListener('resize', () => initialLoad(files));
window.addEventListener('orientationChange', () => initialLoad(files));