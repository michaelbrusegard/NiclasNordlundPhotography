// Text to be displayed on the home page
const quoteText = ["Born in Mariehamn in 1965, Niclas always had an interest in animals and nature.",
`Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance photographer. 
Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards, jigsaw puzzles and other products 
showing the beautiful landscapes, nature and animals of the Åland Islands.`,
"In 2022, he received the award for Post Card Artist of the Year in Finland, and today he has around 40 different post card designs."]

// Adjust the speed parameters of the typing animations
const slowTyping = 35;
const fastTyping = 10;
const runDelay = 500;
let lastExecution = 0;
let clickNumber = 0;
let timeOutLength = slowTyping;

// Adjust how close the scroll value is to the bottom with each new mode
const scrollDistance = 200;

// Getting home elements
const quoteElement = document.getElementById('quote');
const contentContainer = document.getElementById('contentContainer');
const imageDaddy = document.getElementById('imageDaddy');

// Index for switching between home page modes
const modeMax = 4;
let homeModeIndex = 0;

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

// Adjust the speed of the typing animation
quoteElement.addEventListener('click', () => {
    clickNumber += 1;
    if (clickNumber % 2 == 1) {
        timeOutLength = fastTyping;
    } else { 
        timeOutLength = slowTyping;
    }
})

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
}

// Switch mode
function switchMode() {
    // Update home mode index
    homeModeIndex = (homeModeIndex + 1) % modeMax;
    console.log(homeModeIndex)
    // Reset scroll position
    if (homeModeIndex == 3) {
        window.scrollTo(0, 0); 
    } else {
        window.scrollTo(0, scrollMaxValue() - scrollDistance);
    }
    console.log(`new home index: ${homeModeIndex}`)
    // The different modes based on the index change transition
    if (homeModeIndex == 0) {
        imagesQuoteTransition();
    } else if (homeModeIndex == 3) {
        quoteImagesTransition();
    } else {
        quoteQuoteTransition();
    }
}

// Quote-to-quote switch
function quoteQuoteTransition() {
    quoteElement.classList.toggle('hidden');
    quoteElement.addEventListener('transitionend', () => {
        quoteElement.innerHTML = '';
        quoteElement.classList.toggle('hidden');
        quoteElement.addEventListener('transitionend', () => {
            writeText();
        }, {once: true})
    }, {once: true});
}

// Images-to-quote switch
function imagesQuoteTransition() {
    imageDaddy.classList.toggle('hidden');
    imageDaddy.addEventListener('transitionend', () => {
        quoteElement.classList.toggle('hidden');
        quoteElement.addEventListener('transitionend', () => {
            writeText();
        }, {once: true})
    }, {once: true});
}

// Quote-to-images switch
function quoteImagesTransition() {
    quoteElement.classList.toggle('hidden');
    quoteElement.addEventListener('transitionend', () => {
        quoteElement.innerHTML = '';
        imageDaddy.classList.toggle('hidden');
    }, {once: true});
}

// Typing effect function
async function writeText() {
    if ((lastExecution + runDelay) > Date.now()) {
        return;
    }
    lastExecution = Date.now();
    const currentMode = homeModeIndex; 
    // Loops through the text and types it out
    const textString = quoteText[homeModeIndex];
    for (let i = 0; i < textString.length; i++) {
        if (currentMode !== homeModeIndex) {
            break
        }
        quoteElement.innerHTML += textString.charAt(i);
        await new Promise(r => setTimeout(r, timeOutLength));
    }
}

// Button that scrolls down to the bottom of the window
const scrollDownButtons = document.querySelectorAll('.arrow');

// Eventlistener for scroll-down button
scrollDownButtons.forEach(el => {
  el.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo(0, scrollMaxValue());
  });
});


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