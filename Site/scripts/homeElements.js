
// Text to be displayed on the home page
const quoteText = ["Born in Mariehamn in 1965, Niclas always had an interest in animals and nature.",
    `Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance photographer. 
Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards, jigsaw puzzles and other products 
showing the beautiful landscapes, nature and animals of the Åland Islands.`,
    "In 2022, he received the award for Post Card Artist of the Year in Finland, and today he has around 40 different post card designs."];

// Adjust the speed parameters of the typing animations
const slowTyping = 35;
const fastTyping = 5;
let timeOutLength = slowTyping;
let isFast = false;
let isTyping = false;
let isFinishedTyping = [false, false, false];


// Adjust the speed of the typing animation
for (const element of quoteElements) {
    element.addEventListener('click', () => {
        if (isFast) {
            timeOutLength = slowTyping;
            isFast = false;
        } else {
            timeOutLength = fastTyping;
            isFast = true;
        }
    });
}

// Writes the initial text
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    window.scrollTo(0, 0);
    writeText(quoteElements[0], 0);
});

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
        isTyping = false;
        isFinishedTyping[quoteIndex] = true;
    }
}

function observeHome() {
    const carouselObserver = new IntersectionObserver(observeCarousel, { threshold: 0.8 });
    const quotesObserver = new IntersectionObserver(observeQuotes, { threshold: 0.8 });
    carouselObserver.observe(imageDaddy);
    for (let i = 0; i < quotesDaddy.length; i++) {
        quotesObserver.observe(quotesDaddy[i]);
    }
}

function observeCarousel(items) {
    items.map((item => {
        if (item.isIntersecting) {
            item.target.classList.remove('hidden');
        } else {
            item.target.classList.add('hidden');
        }
    }));
}

function observeQuotes(items) {
    items.map((item => {
        if (item.isIntersecting) {
            item.target.classList.remove('hidden');
            for (i = 0; i < quotesDaddy.length; i++) {
                if (item.target === quotesDaddy[i]) {
                    writeText(quoteElements[i], i);
                }
            }
        } else {
            item.target.classList.add('hidden');
        }
    }));
}

function textPosition() {
    for (let i = 0; i < quoteElements.length; i++) {
        if (isPortraitOrientation()) {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "10%";
            quoteElements[i].style.width = "80%";
        } else if (isMobileNav() && !isPortraitOrientation()) {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "30%";
            quoteElements[i].style.width = "80%";
        } else {
            quoteElements[i].style.left = "5%";
            quoteElements[i].style.top = "30%";
            quoteElements[i].style.width = "50%";
        }
    }
}

// // Intersection observer for quote elements
// const quoteObserver = new IntersectionObserver((elements) => {
//     elements.map((el) => {
//         // Fade in and start typing
//         if (el.isIntersecting) {
//             el.target.classList.toggle('hidden');
//             el.target.addEventListener('transitionend', () => { writeText(el.target, 0); }, { once: true });
//         }
//         // Fade out and remove text
//         else {
//             el.target.classList.toggle('hidden');
//             el.target.addEventListener('transitionend', () => { el.target.innerHTML = ''; }, { once: true });
//         }
//     });
// });

// // Intersection observer for image carousel
// const daddyObserver = new IntersectionObserver((elements) => {
//     for (const el of elements) {
//         // Fade in and start carousel animation
//         if (el.isIntersecting) {
//             console.log("test");
//             el.target.classList.toggle('hidden');
//             el.target.addEventListener('transitionend', () => { console.log('start animation'); }, { once: true });
//         }
//         // Stop animation and fade out
//         else {
//             console.log('stop animation');
//             el.target.classList.toggle('hidden');
//         }
//     }
// });

/*
/*
// Getting the scroll max value for the page (credit: https://stackoverflow.com/questions/17688595/)
const scrollMaxValue = () => {
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowHeight = window.innerHeight;
    return documentHeight - windowHeight;
};

// Switch mode on scroll
window.addEventListener("scroll", () => {
    // Checking if we have reached a minimum scroll value (and not at the bottom)
    if ((window.pageYOffset == scrollMaxValue()) && (homeModeIndex !== 3)) {
        console.log('down active');
        switchMode(indexChange=+1);
    }
    // Checking if we have reached a maximum scroll value (and not at the top)
    else if ((window.pageYOffset == 0) && (homeModeIndex !== 0)) {
        console.log('up active');
        switchMode(indexChange=-1);
    }
});

// Switch mode
function switchMode(indexChange) {
    // Updating home mode index
    homeModeIndex += indexChange;
    console.log(`new home index: ${homeModeIndex}`)
    // Loading a new mode
    if (homeModeIndex == 3) {
        imagesQuoteTransition(indexChange);
    } else if ((homeModeIndex == 2) && (indexChange > 0)) {
        imagesQuoteTransition(indexChange);
    } else {
        quoteQuoteTransition(indexChange);
    }
}

// Quote-to-quote switch
function quoteQuoteTransition(indexChange) {
    quoteElements[homeModeIndex - indexChange].classList.toggle('hidden');
    quoteElements[homeModeIndex - indexChange].addEventListener('transitionend', () => {
        quoteElements[homeModeIndex - indexChange].innerHTML = '';
        quoteElements[homeModeIndex].classList.toggle('hidden');
        quoteElements[homeModeIndex].addEventListener('transitionend', () => {
            writeText();
        }, {once: true})
    }, {once: true});
}

// Images-to-quote switch (and vice versa)
function imagesQuoteTransition(indexChange) {
    if (indexChange > 0) {
        quoteElements[homeModeIndex].classList.toggle('hidden');
        quoteElements[homeModeIndex].addEventListener('transitionend', () => {
            quoteElements[homeModeIndex].innerHTML = '';
            imageDaddy.classList.toggle('hidden');
        }, {once: true});
    } else {
        imageDaddy.classList.toggle('hidden');
        imageDaddy.addEventListener('transitionend', () => {
            quoteElements[homeModeIndex].classList.toggle('hidden');
            quoteElements[homeModeIndex].addEventListener('transitionend', () => {
                writeText();
            }, {once: true})
        }, {once: true});
    }
}
*/

/*
// Switch mode on scroll
window.addEventListener("scroll", () => {
    scrollSwitch();
    console.log(window.scrollY);
}, false);

// Writes the initial text and sets a high scrollY on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, scrollMaxValue() - scrollDistance);
    imageDaddy.classList.toggle("hidden");
    writeText();
})

function scrollSwitch() {
    // Checking if we have reached a minimum scroll value
    if (window.pageYOffset == scrollMaxValue()) {
        console.log('down active');
        switchMode();
    }
*/
/*
// Quote-to-images switch (or vice versa)
function contentTransition(currentContent, newContent) {
    currentContent.classList.toggle('hidden');
    currentContent.addEventListener('transitionend', () => {
        newContent.classList.toggle('hidden');
    }, {once: true});
}
*/

/*
// Typing effect function
async function writeText(textString, id, timeOut) {
    // Run only if the function is not already running
    if(!writeText.isRunning) {
        const textElement = document.getElementById(id);
        // Loops through the text and types it out
        for (let i = 0; i < textString.length; i++) {
            textElement.innerHTML += textString.charAt(i);
            await new Promise(r => setTimeout(r, timeOut));
        }
        await new Promise(r => setTimeout(r, timeOut));
        writeText.isRunning = true;
    } else {
    }
}

/*

// NON-CYCLIC APPROACH

function scrollSwitch() {
    console.log(window.scrollY);
    // Checking if we have reached a maximum scroll value
    if ((window.pageYOffset == scrollMaxValue()) && !(homeModeIndex == modeMax)) {
        console.log('down active');
        switchMode(indexChange=+1);
    }
    // Checking if we have reached a minimum scroll value
    else if ((window.pageYOffset == 0) && !(homeModeIndex == 0)) {
        console.log('up active');
        switchMode(indexChange=-1);
    }
}

// Switch mode
function switchMode(indexChange) {
    // Update home mode index
    homeModeIndex += indexChange;
    // Reset scroll position if we are at an extermal value
    if (0 < homeModeIndex < modeMax) {
        window.scrollTo(0, scrollMaxValue()/2);
    }
    console.log(`new home index: ${homeModeIndex}`)
    // The different modes based on the index change transition
    if (homeModeIndex == 3) {
        contentTransition(quoteElement, imageDaddy);
    } else if ((homeModeIndex == 2) && (indexChange < 0)) {
        contentTransition(imageDaddy, quoteElement);
        writeText();
    } else {
        quoteQuoteTransition();
    }
}

*/

// Old carousel code
/*
const carouselInterval = 4000;
// Automatic transition between carousel photos
function carouselAnimation(interval) {
    let counter = 1;
    setInterval(function () {
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if (counter > 8) {
            counter = 1;
        }
    }, interval);
}
*/

/*
// Intersection observer that actives a mode switch upon new intersections
const io = new IntersectionObserver((elements, io) => {
    const targetList = [];
    let index = 0;
    elements.forEach((el) => {
        console.log(el.target);
        console.log(el.isIntersecting);
        if (el.isIntersecting) {
            console.log(el.target);
            switchMode(index);
        }
        index += 1;
    });
});

// Start by observing only the 2nd quote
io.observe(quoteElements[1]);

// Switch between modes on the home page
function switchMode (changeIndex) {
    console.log(`activated item index: ${changeIndex}`);
    console.log(`home mode index: ${homeModeIndex}`);
    
    const downScroll = (changeIndex == 0);
    // Downscroll from top
    if ((homeModeIndex == 0) && (downScroll)) {
        console.log(`thing: ${quoteElements[homeModeIndex + 1]}`);
        console.log(quoteElements[homeModeIndex + 1]);
        io.unobserve(quoteElements[homeModeIndex + 1]);
        
        io.observe(quoteElements[homeModeIndex + 2]);
        io.observe(quoteElements[homeModeIndex]);
    } 
    // Upscroll to top
    else if ((homeModeIndex == 0) && (!downScroll)) {
        io.unobserve(quoteElements[homeModeIndex + 1]);
        io.unobserve(quoteElements[homeModeIndex - 1]);
        io.observe(quoteElements[homeModeIndex]);
    } 
    // Downscroll in quotes section
    else if ((0 < homeModeIndex < (modeMax - 1)) && (downScroll)) {
        io.unobserve(quoteElements[homeModeIndex + 1]);
        io.unobserve(quoteElements[homeModeIndex - 1]);
        
        io.observe(quoteElements[homeModeIndex + 2]);
        io.observe(quoteElements[homeModeIndex]);
    } 
    // Upscroll in quotes section
    else if ((0 < homeModeIndex < (modeMax - 1)) && (!downScroll)) {
        io.unobserve(quoteElements[homeModeIndex + 1]);
        io.unobserve(quoteElements[homeModeIndex - 1]);
        
        io.observe(quoteElements[homeModeIndex]);
        io.observe(quoteElements[homeModeIndex - 2]);
    }
    // Downscroll to images
    else if ((homeModeIndex == (modeMax - 1)) && (downScroll)) {
        io.unobserve(quoteElements[homeModeIndex + 1]);
        io.unobserve(quoteElements[homeModeIndex - 1]);
        
        io.observe(imageDaddy);
        io.observe(quoteElements[homeModeIndex]);
    }
    // Upscroll from images
    else if ((0 < homeModeIndex < (modeMax - 1)) && (!downScroll)) {
        io.unobserve(quoteElements[homeModeIndex + 1]);
        io.unobserve(quoteElements[homeModeIndex - 1]);
        
        io.observe(quoteElements[homeModeIndex]);
        io.observe(quoteElements[homeModeIndex - 2]);
    }
    else {return}
    // Update home index
    (downScroll) ? homeModeIndex += 1 : homeModeIndex -= 1;
}

*/