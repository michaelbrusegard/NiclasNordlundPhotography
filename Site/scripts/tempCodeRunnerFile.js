function calculateColumsRows() {
    // Gets amount of colums and rows that are visible in the viewport
    const colums = getComputedStyle(gridWrapper).getPropertyValue('grid-template-columns').split(' ').length;
    const rows = Math.floor(window.innerHeight / 150)
    return [colums, rows]
}