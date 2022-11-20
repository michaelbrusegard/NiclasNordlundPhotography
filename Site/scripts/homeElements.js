
// Text to be displayed on the home page
const quoteText = ['Born in Mariehamn in 1965, Niclas always had an interest in animals and nature.', 
'Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance photographer.',
`Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards, jigsaw puzzles and other products 
showing the beautiful landscapes, nature and animals of the Åland Islands.`,
'In 2022, he received the award for Post Card Artist of the Year in Finland, and today he has around 40 different post card designs.'];

// Adjust the speed parameters of the typing animations
const slowTyping = 32;
const fastTyping = 8;
let timeOutLength = slowTyping;
let isFast = false;
let isTyping = false;
let isFinishedTyping = Array(4).fill(false);


// Adjust the speed of the typing animation
for (const element of document.querySelectorAll('.quotesDaddy')) {
    element.addEventListener('click', () => {
        if (isFast) {
            timeOutLength = slowTyping;
            isFast = false;
            console.log('slow');
        } else {
            timeOutLength = fastTyping;
            isFast = true;
            console.log('fast');
        }
    });
}

// Writes the initial text
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
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
        timeOutLength = slowTyping;
        isFast = false;
        isTyping = false;
        isFinishedTyping[quoteIndex] = true;
    }
}

function observeHome() {
    const carouselObserver = new IntersectionObserver(observeCarousel, { threshold: 0.5 });
    const quotesObserver = new IntersectionObserver(observeQuotes, { threshold: 0.5 });
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