// Array for image path and dimensions
const files = [
    [
        "wedding01.jpg",
        1133,
        1700
    ],
    [
        "wedding02.jpg",
        1700,
        1063
    ],
    [
        "wedding03.jpg",
        1700,
        1133
    ]
];

// Column variables
const columnSize = 384 * 1.5;
const maxColumns = 3;

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => { loadImages(files); showcaseFadeOnscroll(); });
window.addEventListener('resize', () => { loadImages(files); showcaseFadeOnscroll(); });
window.addEventListener('orientationChange', () => { loadImages(files); showcaseFadeOnscroll(); });