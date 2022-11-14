const files = [["wedding1.jpg",1133,1700],["wedding2.jpg",1700,1063],["wedding3.jpg",1700,1133]]
const columnSize = 384 * 1.5
const maxColumns = 3

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => initialLoad(files));
window.addEventListener('resize', () => initialLoad(files));
window.addEventListener('orientationChange', () => initialLoad(files));