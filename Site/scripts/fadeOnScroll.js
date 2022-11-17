function fadeOnscroll() {
    const observer = new IntersectionObserver(handleIntersection);
    const images = document.getElementsByClassName('image');
    for (i = 0; i < images.length; i++) {
        observer.observe(images[i]);
    }
}

function handleIntersection(entries) {
    entries.map((entry) => {
        const columns = document.getElementsByClassName('column');
        const columnsAmount = columns.length;
        const parent = entry.target.parentNode;

        if (entry.isIntersecting) {
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
            } else {
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
            }
        } else {
            entry.target.classList.remove('fadeInFromBottom');
            entry.target.classList.remove('fadeInFromLeft');
            entry.target.classList.remove('fadeInFromRight');
            entry.target.classList.remove('fadeInFromLeftBottom');
            entry.target.classList.remove('fadeInFromRightBottom');
        }
    });
}
