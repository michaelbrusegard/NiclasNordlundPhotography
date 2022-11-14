const files = [["architectural1.jpg", 1700, 1063], ["architectural10.jpg", 1700, 1105], ["architectural11.jpg", 1680, 1200], ["architectural12.jpg", 1700, 1063], ["architectural13.jpg", 1700, 1106], ["architectural14.jpg", 1700, 1062], ["architectural15.jpg", 1700, 956], ["architectural16.jpg", 1700, 1063], ["architectural17.jpg", 1700, 1000], ["architectural18.jpg", 1700, 956], ["architectural19.jpg", 1700, 1063], ["architectural2.jpg", 1200, 1600], ["architectural3.jpg", 1700, 1133], ["architectural4.jpg", 1700, 907], ["architectural5.jpg", 1700, 1190], ["architectural6.jpg", 1700, 956], ["architectural7.jpg", 1700, 956], ["architectural8.jpg", 1700, 956], ["architectural9.jpg", 1680, 1200]];
const columnSize = 384
const maxColumns = 6

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => initialLoad(files));
window.addEventListener('resize', () => initialLoad(files));
window.addEventListener('orientationChange', () => initialLoad(files));