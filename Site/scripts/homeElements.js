// Typing effect function
async function writeText(element, quoteIndex) {
    // Loops through the text and types it out
    if ((!isTyping) && (!isFinishedTyping[quoteIndex])) {
        isTyping = true;
        element.innerHTML = '';
        const textString = quoteText[quoteIndex];
        for (let i = 0; i < textString.length; i++) {
            if (quotesDaddy[quoteIndex].className.endsWith('hidden')) {
                element.innerHTML = textString
                nextIndex = quoteIndex + 1;
                break
            }
            element.innerHTML += textString.charAt(i);
            await new Promise(r => setTimeout(r, timeOutLength));
        }
        nextIndex = quoteIndex + 1;
        if (!isFast) {
            setTimeout(() => {scrollToNextQuote(nextIndex)}, intervalTime)
        }

        timeOutLength = slowTyping;
        isFast = false;
        isTyping = false;
        isFinishedTyping[quoteIndex] = true;
    }
}

// Function that scrolls into next div when quote is finished
function scrollToNextQuote(index) {
    if (index === quotesDaddy.length) {imageDaddy.scrollIntoView()}
    else {quotesDaddy[index].scrollIntoView()}
}

// Creates observers for home elements and starts observing them
function observeHome() {
    const carouselObserver = new IntersectionObserver(observeCarousel, { threshold: 0.8 });
    const quotesObserver = new IntersectionObserver(observeQuotes, { threshold: 0.8 });
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
            timeOutLength = slowTyping;
            item.target.classList.remove('hidden');
            for (i = 0; i < quotesDaddy.length; i++) {
                if (item.target === quotesDaddy[i]) {
                    // Start writing text
                    currentIndex = i
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
            quoteElements[i].style.top = "20%";
            quoteElements[i].style.width = "90%";
        } else if (isMobileNav() && !isPortraitOrientation()) {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "25%";
            quoteElements[i].style.width = "90%";
        } else {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "35%";
            quoteElements[i].style.width = "50%";
        }
    }
}