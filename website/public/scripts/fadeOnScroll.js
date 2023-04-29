// Adds fade on scroll effect in an observer
function showcaseFadeOnscroll(items) {
    // Goes over every item that is observed
    items.map((item) => {
        // Gets columnx and the item parent variable
        const columns = document.getElementsByClassName('column');
        const columnsAmount = columns.length;
        const parent = item.target.parentNode;

        // Checks if the item is intersecting
        if (item.isIntersecting) {
            // Checks how many columns there are
            // Adds the fade in animation based on which column the photo is in
            if (columnsAmount === 1) {
                item.target.classList.add('fadeInFromBottom');
            } else if (columnsAmount === 2) {
                if (parent === columns[0]) {
                    item.target.classList.add('fadeInFromLeftBottom');
                } else {
                    item.target.classList.add('fadeInFromRightBottom');
                }
            } else if (columnsAmount === 3) {
                if (parent === columns[0]) {
                    item.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[1]) {
                    item.target.classList.add('fadeInFromBottom');
                } else {
                    item.target.classList.add('fadeInFromRightBottom');
                }
            } else if (columnsAmount === 4) {
                if (parent === columns[0]) {
                    item.target.classList.add('fadeInFromLeft');
                } else if (parent === columns[1]) {
                    item.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[2]) {
                    item.target.classList.add('fadeInFromRightBottom');
                } else {
                    item.target.classList.add('fadeInFromRight');
                }
            } else if (columnsAmount === 5) {
                if (parent === columns[0]) {
                    item.target.classList.add('fadeInFromLeft');
                } else if (parent === columns[1]) {
                    item.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[2]) {
                    item.target.classList.add('fadeInFromBottom');
                } else if (parent === columns[3]) {
                    item.target.classList.add('fadeInFromRightBottom');
                } else {
                    item.target.classList.add('fadeInFromRight');
                }
            } else {
                if (parent === columns[0]) {
                    item.target.classList.add('fadeInFromLeft');
                } else if (parent === columns[1]) {
                    item.target.classList.add('fadeInFromLeftBottom');
                } else if (parent === columns[columnsAmount - 2]) {
                    item.target.classList.add('fadeInFromRightBottom');
                } else if (parent === columns[columnsAmount - 1]) {
                    item.target.classList.add('fadeInFromRight');
                } else {
                    item.target.classList.add('fadeInFromBottom');
                }
            }
        } else {
            // Removes any fade in animation when not intersecting
            item.target.classList.remove('fadeInFromBottom');
            item.target.classList.remove('fadeInFromLeft');
            item.target.classList.remove('fadeInFromRight');
            item.target.classList.remove('fadeInFromLeftBottom');
            item.target.classList.remove('fadeInFromRightBottom');
        }
    });
}

// Adds fade on scroll effect to shop items
function shopFadeOnscroll(items) {
    items.map((item) => {
        if (item.isIntersecting) {
            // Makes the animation time different for every element to add variation
            item.target.style.setProperty('--variedScaleFadeIn', Math.random());
            item.target.classList.add('scaleFadeIn');
            item.target.addEventListener('animationend', () => {
                item.target.classList.remove('scaleFadeIn');
            });
        }
    });
}
