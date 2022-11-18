//Otto is working on this, can be deleted if not needed

carousel = document.getElementsByClassName('carousel');
textDiv = document.getElementsByClassName('textDiv');

niclasPortrait = document.getElementById('niclasPortrait');

var printedText1 = document.getElementById("text1")
var printedText2 = document.getElementById("text2")
var printedText3 = document.getElementById("text3")


var textPhoto = document.getElementById("textPhoto");
var carousel = document.getElementById("carousel");

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














var niclasPortrait = document.getElementById("niclasImg");
var carousel = document.getElementById("sliderStart")
var carouselChildren = document.getElementById("sliderStart")

// var carousel = document.getElementById("carousel");
var div = document.getElementById("containerBig");
var scrollPosition = window.scrollY;

carouselChildren.style.visibility = "hidden"


//scrollSwitch
window.addEventListener("scroll", scrollSwitch);
function scrollSwitch() {


    // var carousel = document.getElementById("carousel");
    
    var scrollPosition = window.scrollY;

    if (scrollPosition > 450) {
        index = 3;
        console.log(index);
        console.log(scrollPosition);
        printedText1.style.visibility = "hidden";
        printedText2.style.visibility = "hidden";
        printedText3.style.visibility = "hidden";
        carouselChildren.style.visibility = "visible";

        //scroll position blir annerledes når ting blir fjerna
    }

    else if (scrollPosition > 300) {
        index = 2;
        console.log(index);
        console.log(scrollPosition);
        printedText1.style.visibility = "hidden";
        printedText2.style.visibility = "hidden";
        printedText3.style.visibility = "visible";
        carouselChildren.style.visibility = "hidden";
        writingText3(text3)
        
    }  
    else if (scrollPosition > 150) {
    index = 1;
    console.log(index);
    console.log(scrollPosition);
    printedText1.style.visibility = "hidden";
    printedText2.style.visibility = "visible";
    printedText3.style.visibility = "hidden";
    carouselChildren.style.visibility = "hidden"; 
    writingText2(text2)
}

    else {
        console.log(scrollPosition);
        index = 0;
        console.log(index);
        console.log(scrollPosition);
        printedText1.style.visibility = "visible";
        printedText2.style.visibility = "hidden";
        printedText3.style.visibility = "hidden";
        carouselChildren.style.visibility = "hidden";

    }
}
    



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