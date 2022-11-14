const files = [["animals1.jpg",1700,1063],["animals10.jpg",1680,1200],["animals11.jpg",1700,1062],["animals12.jpg",1700,1063],["animals13.jpg",1700,850],["animals14.jpg",1700,956],["animals15.jpg",1700,956],["animals16.jpg",1700,904],["animals17.jpg",1700,785],["animals18.jpg",1700,904],["animals19.jpg",1700,1046],["animals2.jpg",1700,1133],["animals3.jpg",1200,1680],["animals4.jpg",1700,1133],["animals5.jpg",1700,1063],["animals6.jpg",1700,1133],["animals7.jpg",1700,1133],["animals8.jpg",1200,1680],["animals9.jpg",1700,1062]]
const columnSize = 384
const maxColumns = 6

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => initialLoad(files));
window.addEventListener('resize', () => initialLoad(files));
window.addEventListener('orientationChange', () => initialLoad(files));