function imageCarousel() {
    const images = document.querySelectorAll('#imageDaddy img');
    images[0].classList.add('imageIn')
    images[0].addEventListener('animationend', () => {
        images[0].classList.remove('imageIn')
    })
} 