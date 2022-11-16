//Otto is working on this, can be deleted if not needed
console.log("test")

carousel = document.getElementsByClassName('carousel');
textDiv = document.getElementsByClassName('textDiv');

niclasPortrait = document.getElementById('niclasPortrait');




    var textPhoto= document.getElementById("textPhoto")
    var carousel= document.getElementById("carousel")

    //find class of element textPhoto
    var textPhotoClass = textPhoto.className;
    //find class of element carousel
    var carouselClass = carousel.className;

    window.addEventListener("scroll", switchActive)
    
    textPhoto.classList.toggle("active")
    
    function switchActive(){
        if (textPhotoClass == "active"){
            console.log("nå skal textPhoto bli borte")
            textPhoto.classList.remove("active")
            carousel.classList.add("active")
        } else if (carouselClass == "active"){
            carousel.classList.add("active")
            textPhoto.classList.remove("active")
            console.log("nå skal carousel bli borte")

        }
    
        
    }