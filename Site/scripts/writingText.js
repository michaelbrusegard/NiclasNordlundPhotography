var i = 0;
function writingText(quote){
    if (i<quote.length){
        document.getElementById("text1").innerHTML += quote.charAt(i);
        i++;
        setTimeout(writingText, 75);
    }
}

const para=document.getElementById("text1");
const paraText="Born in Mariehamn in 1965, Niclas always had an interest in animals and nature."

document.addEventListener("DOMContentLoaded", ()=> {
    writingText(paraText);
    
    
})

const para2= document.getElementById("text2");
const para2Text = `Photography was always there as a hobby, but in 2018, he took the step to become a full time freelance
photographer. Besides the photography itself, Niclas also creates pictures to hang on your wall, postcards,
jigsaw puzzles and other products showing the beautiful landscapes, nature and animals of the Åland Islands.`
//document.addEventListener("scroll", () => {
//    writingText(para2Text);})




        