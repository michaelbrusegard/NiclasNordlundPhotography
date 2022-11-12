// Important variables
const wrapper = document.getElementsByClassName('specialWrapper')[0];
const totalImages = 3;

// Runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lazyload('wedding', wrapper, totalImages);
});