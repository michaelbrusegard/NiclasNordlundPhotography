const files = [["portrait1.jpg",1125,1700],["portrait10.jpg",1600,1200],["portrait11.jpg",1700,1063],["portrait12.jpg",1700,1133],["portrait13.jpg",1133,1700],["portrait14.jpg",1600,1200],["portrait15.jpg",1700,1133],["portrait16.jpg",1700,895],["portrait2.jpg",1700,1134],["portrait3.jpg",1700,1063],["portrait4.jpg",1700,1134],["portrait5.jpg",1200,1200],["portrait6.jpg",1700,956],["portrait7.jpg",1700,1133],["portrait8.jpg",1133,1700],["portrait9.jpg",1700,956]]
const columnSize = 384
const maxColumns = 5

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => initialLoad(files));
window.addEventListener('resize', () => initialLoad(files));
window.addEventListener('orientationChange', () => initialLoad(files));