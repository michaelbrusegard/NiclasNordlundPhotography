// Text to be displayed on the home page
const text1 = "Born in Mariehamn in 1965, Niclas always had an interest in animals and nature.";
const text2 = `Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance photographer. 
Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards, jigsaw puzzles and other products 
showing the beautiful landscapes, nature and animals of the Åland Islands.`;
const text3 = "In 2022, he received the award for Post Card Artist of the Year in Finland, and today he has around 40 different post card designs.";

// Adjusts the speed of the basic animations
const timeOutLength = 40;
const carouselInterval = 4000;

// Getting home elements
const printedText1 = document.getElementById("text1");
const printedText2 = document.getElementById("text2");
const printedText3 = document.getElementById("text3");
const containerBig = document.getElementById("containerBig");
const carousel = document.getElementById("imageDaddy");

// Writes the initial text on DOM load
document.addEventListener("DOMContentLoaded", () => {
    writeText(text1, 'text1', timeOutLength);
    printedText1.style.visibility = "visible";
    carouselAnimation(carouselInterval)
    carousel.style.visibility = "hidden";
})

// Index for switching between home page modes
const modeMax = 3;
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

// Switch mode on scroll
window.addEventListener("scroll", () => {
    scrollSwitch();
});

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
    // The different modes
    if (homeModeIndex == 3) {
        //console.log(index);
        //console.log(scrollPosition);
        console.log(`run carousel code`);
        printedText1.style.visibility = "hidden";
        printedText2.style.visibility = "hidden";
        printedText3.style.visibility = "hidden";
        carousel.style.visibility = "visible";

        //scroll position blir annerledes når ting blir fjerna
    } else if (homeModeIndex == 2) {
        //console.log(index);
        //console.log(scrollPosition);
        console.log(`run quote 3 code`);
        printedText1.style.visibility = "hidden";
        printedText2.style.visibility = "hidden";
        printedText3.style.visibility = "visible";
        carousel.style.visibility = "hidden";
        writeText(text3, 'text3', timeOutLength);
        
    }  
    else if (homeModeIndex == 1) {
        //console.log(index);
        //console.log(scrollPosition);
        console.log(`run quote 2 code`);
        printedText1.style.visibility = "hidden";
        printedText2.style.visibility = "visible";
        printedText3.style.visibility = "hidden";
        carousel.style.visibility = "hidden"; 
        writeText(text2, 'text2', timeOutLength);
    }
    else {
        //console.log(scrollPosition);
        //console.log(index);
        //console.log(scrollPosition);
        console.log(`run carousel code`);
        printedText1.style.visibility = "visible";
        printedText2.style.visibility = "hidden";
        printedText3.style.visibility = "hidden";
        carousel.style.visibility = "hidden";
    }
}

// Typing effect function
async function writeText(textString, id, timeOut) {
    const textElement = document.getElementById(id);
    // Loops through the text and types it out
    for (let i = 0; i < textString.length; i++) {
        textElement.innerHTML += textString.charAt(i);
        await new Promise(r => setTimeout(r, timeOut));
    }
    await new Promise(r => setTimeout(r, timeOut));
}

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
*/

/*
const scrollUpThreshold = 100;
const scrollInitial = 300;
const scrollDownThreshold = 500;
*/

/*
// Initial scroll value
window.scrollTo(0, scrollInitial);
let scrollPosition = window.scrollY;
console.log(`Init pos: ${scrollPosition}`);
*/

/*
// Detect scroll direction
window.onscroll = async function() {
    // print "false" if direction is down and "true" if up
    
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve(this.oldScroll > this.scrollY), 1)
      });
    
    let result = await promise;
    console.log(result);
    
    const direction = (this.oldScroll > this.scrollY);
    console.log(direction);
    this.oldScroll = this.scrollY;
    await new Promise(r => setTimeout(r, 1));
}
*/

/*
// Switch mode on scroll
window.addEventListener("scroll", () => {
    if (scrollPosition > scrollUpThreshold) {
        homeModeIndex -= 1;
        scrollSwitch();
        
    } else if (scrollPosition < scrollDownThreshold) {
        homeModeIndex += 1;
        scrollSwitch();
    }
});
*/


// /**
//  * Get current browser viewpane height
//  * inspiration from https://stackoverflow.com/questions/3012668/get-the-window-height
//  */
//  function _get_window_height() {
//     return window.innerHeight || 
//            document.documentElement.clientHeight ||
//            document.body.clientHeight || 0;
// }/**
//  * Get current absolute window scroll position
//  */
// function _get_window_Yscroll() {
//     return window.pageYOffset || 
//            document.body.scrollTop ||
//            document.documentElement.scrollTop || 0;
// }/**
//  * Get current absolute document height
//  */
// function _get_doc_height() {
//     return Math.max(
//         document.body.scrollHeight || 0, 
//         document.documentElement.scrollHeight || 0,
//         document.body.offsetHeight || 0, 
//         document.documentElement.offsetHeight || 0,
//         document.body.clientHeight || 0, 
//         document.documentElement.clientHeight || 0
//     );
// }/**
//  * Get current vertical scroll percentage
//  */
// function _get_scroll_percentage() {
//     var screenSeen = (
//         (_get_window_Yscroll() + _get_window_height()) / _get_doc_height()
//     ) * 100;
//     console.log(screenSeen);
//     return screenSeen
    
// }
// const initial = _get_scroll_percentage()
// body = document.querySelector("body");
// window.addEventListener("scroll", _get_scroll_percentage)



// window.addEventListener("scroll", ()=>{
//     console.log("test")
//     console.log(initial)
    
//     if (_get_scroll_percentage() > 90){
//         body.style.backgroundColor = "white";
        
//     }
//     else if (_get_scroll_percentage() > initial +40){
//         body.style.backgroundColor = "grey";
//         carousel.style.visibility ="visible"
//         carouselChildren.style.visibility ="visible"
//     }
//     else if (_get_scroll_percentage() > initial + 30){
//         body.style.backgroundColor = "black";
//         printedText3.style.display = "none";
//         body.style.backgroundColor = "grey";
//         carousel.style.visibility ="visible"
//         carouselChildren.style.visibility ="visible"
//         writingText3(text3);
        
//         //carousel should be hidden by default 

//     }
//     else if (_get_scroll_percentage() > initial +20){
//         body.style.backgroundColor = "blue";
//         printedText2.style.display = "none";
//         writingText2(text2);
    
//     }
//     else if (_get_scroll_percentage() > initial + 10){
//         body.style.backgroundColor = "red";
//         index = 0;
//         console.log(index);
//         printedText1.style.display = "none";
       
//     }
//     })



//     scrollSwitch
// window.addEventListener("scroll", scrollSwitch);
// function scrollSwitch() {

    

//     if (scrollPosition > 0 && scrollPosition < 50) {
//         console.log(scrollPosition);
        

//         niclasPortrait.src = "img/home/niclas.png";
//     } else if (scrollPosition > 50 && scrollPosition < 100) {
//         index = 1;
//         console.log(index);
//         niclasPortrait.src = "img/home/niclas.png";
//     } else if (scrollPosition > 100 && scrollPosition < 199) {
//         index = 2;
//         console.log(index);
//         text3.style.display = "block";
//         niclasPortrait.src = "img/home/niclas.png";
//         div.style.visibility = "hidden";
//     } else if (scrollPosition > 300) {
//         index = 3;
//         console.log(index);
//         text1.style.display = "none";
//         text2.style.display = "none";
//         text3.style.display = "none";
//         div.style.visibility = "hidden";
//         niclasPortrait.style.visibility = "hidden";

//         //scroll position blir annerledes når ting blir fjerna

//     

//Otto is working on this, can be deleted if not needed



// //find class of element textPhoto
// var textPhotoClass = textPhoto.className;
// //find class of element carousel
// var carouselClass = carousel.className;

// window.addEventListener("scroll", switchActive);

// <textPhoto.classList.toggle("active");>

// function switchActive() {
//     if (textPhotoClass == "active") {
//         console.log("nå skal textPhoto bli borte");
//         textPhoto.classList.remove("active");
//         carousel.classList.add("active");
//     } else if (carouselClass == "active") {
//         carousel.classList.add("active");
//         textPhoto.classList.remove("active");
//         console.log("nå skal carousel bli borte");

//     }
// }







//can be removed when script works, work in progress script from homehtml 
/* <script>

//scrollSwitch
window.addEventListener("scroll", scrollSwitch);
function scrollSwitch() {

    var niclasPortrait = document.getElementById("niclasImg");
    var carousel = document.getElementById("carousel");
    var div = document.getElementById("containerBig");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0 && scrollPosition < 50) {
        console.log(scrollPosition);
        index = 0;
        console.log(index);
        printedText1.style.display = "block";
        text2.style.display = "none";
        text3.style.display = "none";
        carousel.visibility = "hidden";

        niclasPortrait.src = "img/home/niclas.png";
    } else if (scrollPosition > 50 && scrollPosition < 100) {
        index = 1;
        console.log(index);
        niclasPortrait.src = "img/home/niclas.png";
    } else if (scrollPosition > 100 && scrollPosition < 199) {
        index = 2;
        console.log(index);
        text3.style.display = "block";
        niclasPortrait.src = "img/home/niclas.png";
        div.style.visibility = "hidden";
    } else if (scrollPosition > 300) {
        index = 3;
        console.log(index);
        text1.style.display = "none";
        text2.style.display = "none";
        text3.style.display = "none";
        div.style.visibility = "hidden";
        niclasPortrait.style.visibility = "hidden";

        //scroll position blir annerledes når ting blir fjerna

    }

}


</script> */




    //these should be on scroll instead
    











/*
let listItems=[...document.getElementsByClassName("quotes")]

let options = {
    rootMargin: "-10%",
    thresholdt: 0.0
}

let observer = new IntersectionObserver(showItem, options);
function showItem(entries){
    entries.forEach(entry =>{
        if (entry.isIntersecting){
            let letters = [...entry.target.querySelectorAll("span")];
            letters.forEach((letter, idx) => {
                setTimeout(() =>{
                    letter.classList.add("active");
                }, idx*70)
            })
            entry.target.children[0].classList.add("active");
        }
    })
}

listItems.forEach(item =>{
    let newString="";
    let itemText = item.children[0].innerText.split("");
    itemText.map(letter => (newString += letter == " " ? `<span class=gap></span>` : `<span>${letter}</span>`));
    item.innerHtml = newString;
    observer.observe(item);

})
*/

/*
function writingText(){
    if (i<fullText.length){
        document.getElementById("text1").innerHTML += fullText.charAt(i);
        i++;
        setTimeout(writingText, 75);
    }
}
*/