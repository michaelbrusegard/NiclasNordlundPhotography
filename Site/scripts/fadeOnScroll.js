// Function that adds an observer to all the showcase images
function addImagesFadeOnScroll() {
    // Create an observer for showcaseFadeOnscroll
    const observer = new IntersectionObserver(showcaseFadeOnscroll);
    // Get all images on showcase
    const images = document.getElementsByClassName('image');
    // Add the observer to every image
    for (i = 0; i < images.length; i++) {
        observer.observe(images[i]);
        console.log('test')
    }
}

// Adds fade on scroll effect in an observer
function showcaseFadeOnscroll(entries) {
    // Goes over every entry that is observed
    entries.map((entry) => {
        // Gets columnx and the entry parent variable
        const columns = document.getElementsByClassName('column');
        const columnsAmount = columns.length;
        const parent = entry.target.parentNode;

        // Checks if the entry is intersecting
        if (entry.isIntersecting) {
            // Checks how many columns there are
            // Adds the fade in animation based on which column the image is
            if (columnsAmount === 1) {
                entry.target.classList.add('fadeInFromBottom');
            } else if (columnsAmount === 2) {
                if (parent === columns[0]) {
                    entry.target.classList.add('fadeInFromLeftBottom');
                } else {
                    entry.target.classList.add('fadeInFromRightBottom');
                }
            } else if (columnsAmount === 3) {
                if (parent === columns[0]) {
                    entry.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[1]) {
                    entry.target.classList.add('fadeInFromBottom');
                } else {
                    entry.target.classList.add('fadeInFromRightBottom');
                }
            } else if (columnsAmount === 4) {
                if (parent === columns[0]) {
                    entry.target.classList.add('fadeInFromLeft');
                } else if (parent === columns[1]) {
                    entry.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[2]) {
                    entry.target.classList.add('fadeInFromRightBottom');
                } else {
                    entry.target.classList.add('fadeInFromRight');
                }
            } else if (columnsAmount === 5) {
                if (parent === columns[0]) {
                    entry.target.classList.add('fadeInFromLeft');
                } else if (parent === columns[1]) {
                    entry.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[2]) {
                    entry.target.classList.add('fadeInFromBottom');
                } else if (parent === columns[3]) {
                    entry.target.classList.add('fadeInFromRightBottom');
                } else {
                    entry.target.classList.add('fadeInFromRight');
                }
            } else {
                if (parent === columns[0]) {
                    entry.target.classList.add('fadeInFromLeft');
                } else if (parent === columns[1]) {
                    entry.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[columnsAmount - 2]) {
                    entry.target.classList.add('fadeInFromRightBottom');
                } else if (parent === columns[columnsAmount - 1]) {
                    entry.target.classList.add('fadeInFromRight');
                } else {
                    entry.target.classList.add('fadeInFromBottom');
                }
            }
        } else {
            // Removes any fade in animation when not intersecting
            entry.target.classList.remove('fadeInFromBottom');
            entry.target.classList.remove('fadeInFromLeft');
            entry.target.classList.remove('fadeInFromRight');
            entry.target.classList.remove('fadeInFromLeftBottom');
            entry.target.classList.remove('fadeInFromRightBottom');
        }
    });
}

// Adds fade on scroll effect to shop items
function shopFadeOnscroll(items) {
    items.map((item => {
        if (item.isIntersecting) {
            item.target.style.setProperty('--variedScaleFadeIn', Math.random())
            item.target.classList.add('scaleFadeIn');
            item.target.addEventListener('animationend', () => {
                item.target.classList.remove('scaleFadeIn');
            })
        }
    }))
}