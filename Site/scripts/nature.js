// Array for image path and dimensions
const files = [
    [
        "nature01.jpg",
        1700,
        1009
    ],
    [
        "nature02.jpg",
        1680,
        1200
    ],
    [
        "nature03.jpg",
        1700,
        1063
    ],
    [
        "nature04.jpg",
        1700,
        956
    ],
    [
        "nature05.jpg",
        1700,
        1063
    ],
    [
        "nature06.jpg",
        1700,
        1133
    ],
    [
        "nature07.jpg",
        1133,
        1700
    ],
    [
        "nature08.jpg",
        1700,
        744
    ],
    [
        "nature09.jpg",
        1700,
        1063
    ],
    [
        "nature10.jpg",
        1700,
        904
    ],
    [
        "nature11.jpg",
        1700,
        956
    ],
    [
        "nature12.jpg",
        1700,
        1074
    ],
    [
        "nature13.jpg",
        1200,
        1200
    ],
    [
        "nature14.jpg",
        1680,
        1200
    ],
    [
        "nature15.jpg",
        1700,
        1062
    ],
    [
        "nature16.jpg",
        1700,
        1133
    ],
    [
        "nature17.jpg",
        1700,
        904
    ]
];

// Column variables
const columnSize = 384 * 1.5;
const maxColumns = 3;

// Loads images into columns
document.addEventListener('DOMContentLoaded', () => { loadImages(files); showcaseFadeOnscroll()(); });
window.addEventListener('resize', () => { loadImages(files); showcaseFadeOnscroll()(); });
window.addEventListener('orientationChange', () => { loadImages(files); showcaseFadeOnscroll()(); });