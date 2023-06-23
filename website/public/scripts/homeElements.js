// Typing effect function
async function writeText(element, quoteIndex) {
    // Loops through the text and types it out
    if (!isTyping && !isFinishedTyping[quoteIndex]) {
        isTyping = true;
        element.textContent = "";
        const textString = quoteText[quoteIndex];
        for (let i = 0; i < textString.length; i++) {
            if (quotesContainer[quoteIndex].className.endsWith("hidden")) {
                element.textContent = textString;
                break;
            }
            element.textContent += textString.charAt(i);
            await new Promise((r) => setTimeout(r, timeOutLength));
        }
        typingTimeoutId = setTimeout(
            () => {
                scrollToNextQuote(currentIndex + 1);
            },
            isFast ? fastIntervalTime : intervalTime
        );

        timeOutLength = slowTyping;
        isFast = false;
        isTyping = false;
        isFinishedTyping[quoteIndex] = true;
    }
}

// Function that scrolls into next div when quote is finished
function scrollToNextQuote(index) {
    if (index === quotesContainer.length) {
        photoCarousel.scrollIntoView();
    } else {
        quotesContainer[index].scrollIntoView();
    }
}

// Creates observers for home elements and starts observing them
function observeHome() {
    const carouselObserver = new IntersectionObserver(observeCarousel, {
        threshold: 0.8,
    });
    const quotesObserver = new IntersectionObserver(observeQuotes, {
        threshold: 0.8,
    });
    carouselObserver.observe(photoCarousel);
    for (let i = 0; i < quotesContainer.length; i++) {
        quotesObserver.observe(quotesContainer[i]);
    }
}

// Observing the carousel and adding/removing hidden class based on if it is intersecting
function observeCarousel(items) {
    items.map((item) => {
        if (item.isIntersecting) {
            item.target.classList.remove("hidden");
        } else {
            item.target.classList.add("hidden");
        }
    });
}

// Observing quotes and adding/removing hidden class based on if it is intersecting
function observeQuotes(items) {
    items.map((item) => {
        if (item.isIntersecting) {
            timeOutLength = slowTyping;
            item.target.classList.remove("hidden");
            for (i = 0; i < quotesContainer.length; i++) {
                if (item.target === quotesContainer[i]) {
                    // Start writing text
                    currentIndex = i;
                    writeText(quoteElements[i], i);
                }
            }
        } else {
            item.target.classList.add("hidden");
        }
    });
}

// Adjust the text position based on screen width and orientation
function textPosition() {
    for (let i = 0; i < quoteElements.length; i++) {
        quoteElements[i].style.left = "5%";
        if (isPortraitOrientation()) {
            quoteElements[i].style.top = "12%";
            quoteElements[i].style.width = "90%";
        } else if (isMobileNav() && !isPortraitOrientation()) {
            quoteElements[i].style.top = "25%";
            quoteElements[i].style.width = "80%";
        } else {
            quoteElements[i].style.top = "35%";
            quoteElements[i].style.width = "50%";
        }
    }
}
