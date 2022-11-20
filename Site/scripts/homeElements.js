// Typing effect function
async function writeText(element, quoteIndex) {
    // Loops through the text and types it out
    if ((!isTyping) && (!isFinishedTyping[quoteIndex])) {
        isTyping = true;
        element.innerHTML = '';
        const textString = quoteText[quoteIndex];
        for (let i = 0; i < textString.length; i++) {
            element.innerHTML += textString.charAt(i);
            await new Promise(r => setTimeout(r, timeOutLength));
        }
        timeOutLength = slowTyping;
        isFast = false;
        isTyping = false;
        isFinishedTyping[quoteIndex] = true;
    }
}

// Creates observers for home elements and starts observing them
function observeHome() {
    const carouselObserver = new IntersectionObserver(observeCarousel, { threshold: 0.5 });
    const quotesObserver = new IntersectionObserver(observeQuotes, { threshold: 0.5 });
    carouselObserver.observe(imageDaddy);
    for (let i = 0; i < quotesDaddy.length; i++) {
        quotesObserver.observe(quotesDaddy[i]);
    }
}

// Observing the carousel and adding/removing hidden class based on if it is intersecting
function observeCarousel(items) {
    items.map((item => {
        if (item.isIntersecting) {
            item.target.classList.remove('hidden');
        } else {
            item.target.classList.add('hidden');
        }
    }));
}

// Observing quotes and adding/removing hidden class based on if it is intersecting 
function observeQuotes(items) {
    items.map((item => {
        if (item.isIntersecting) {
            item.target.classList.remove('hidden');
            for (i = 0; i < quotesDaddy.length; i++) {
                if (item.target === quotesDaddy[i]) {
                    // Start writing text
                    writeText(quoteElements[i], i);
                }
            }
        } else {
            item.target.classList.add('hidden');
        }
    }));
}

// Adjust the text position based on screen width and orientation
function textPosition() {
    for (let i = 0; i < quoteElements.length; i++) {
        if (isPortraitOrientation()) {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "10%";
            quoteElements[i].style.width = "90%";
        } else if (isMobileNav() && !isPortraitOrientation()) {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "15%";
            quoteElements[i].style.width = "80%";
        } else {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "30%";
            quoteElements[i].style.width = "50%";
        }
    }
}

// Adjust the element height based on innerheight minus navbar and footer
function elementsPosition() {
    const containerHeight = String(window.innerHeight - 2 * parseInt(style.getPropertyValue('--navContainerHeight').slice(0, -2))) + 'px';
    imageDaddy.style.height = containerHeight
    console.log(containerHeight)
    for (let i = 0; i < quotesDaddy.length; i++) {
        quotesDaddy[i].style.height = containerHeight
    }
}