// Important variables
const wrapper = document.getElementsByClassName('specialWrapper')[0];
const totalNaturePhotos = 16;

// Runs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lazyload('nature', wrapper, totalNaturePhotos);
});