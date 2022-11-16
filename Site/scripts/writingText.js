var i = 0;
const text1="Born in Mariehamn in 1965, Niclas always had an interest in animals and nature."

const text2 = `Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance
photographer. Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards,
jigsaw puzzles and other products showing the beautiful landscapes, nature and animals of the Åland Islands.`

const text3 = "In 2022, he received the award for Post Card Artist of the Year in Finland, and today he has around 40 different post card designs."



const fullText= `Born in Mariehamn in 1965, Niclas always had an interest in animals and nature.

Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance photographer. Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards, jigsaw puzzles and other products showing the beautiful landscapes, nature and animals of the Åland Islands.

In 2022, he received the award for Post Card Artist of the Year in Finland, and today he has around 40 different post card designs.`


let allText = [text1, text2, text3]

var j=0
var k=0

function writingText1(){
    if (i<text1.length){
        document.getElementById("text1").innerHTML += text1.charAt(i);
        i++;
        setTimeout(writingText1, 75);
}
}

function writingText2(){
    
    if (j<text2.length){
        document.getElementById("text2").innerHTML += text2.charAt(j);
        j++;
        setTimeout(writingText2, 75);
}
}

function writingText3(){
    
    if (k<text3.length){
        document.getElementById("text3").innerHTML += text3.charAt(k);
        k++;
        setTimeout(writingText3, 75);
}
}




    
        
        


console.log(document.getElementById("text1"))

document.addEventListener("DOMContentLoaded", ()=> {
    writingText1(text1);
    writingText2(text2);
    writingText3(text3);
})


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