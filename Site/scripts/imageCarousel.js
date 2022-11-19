function imageCarousel() {
    const daddy = document.querySelector('#imageDaddy')
    const images = document.querySelectorAll('#imageDaddy img');
    const intervalTime = 5000

    newImage(images, imageDisplayed)
    let timer = setInterval(function() {autoImage(images)}, intervalTime);

    daddy.addEventListener('click', () => {
        clearInterval(timer)
        autoImage(images)
        timer = setInterval(function() {autoImage(images)}, intervalTime);
    })
}

function autoImage(images) {
    removeImage(images, imageDisplayed)
        imageDisplayed += 1
        if (imageDisplayed >= images.length) {
            imageDisplayed = 0
        }
        newImage(images, imageDisplayed)
}

function newImage(images, index) {
    images[index].style.visibility = "visible";
    images[index].classList.add("imageIn");
    images[index].addEventListener("animationend", () => {
        images[index].classList.remove("imageIn");
    }, {once: true})
}

function removeImage(images, index) {
    images[index].classList.add("imageOut");
    images[index].addEventListener("animationend", () => {
        images[index].classList.remove("imageOut");
        images[index].style.visibility = "hidden";
    }, {once: true})
}

function imagePosition() {
    const images = document.querySelectorAll('#imageDaddy img');

    images.forEach(image => {
        if (isPortraitOrientation()) {
            image.style.paddingLeft = "2%";
            image.style.paddingRight = "4%";
            image.style.paddingBottom = "30%";
            image.style.paddingTop = "5%";
        } else {
            image.style.paddingLeft = "5%";
            image.style.paddingRight = "30%";
            image.style.paddingBottom = "4%";
            image.style.paddingTop = "2%";
        }
    });
}