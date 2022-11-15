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