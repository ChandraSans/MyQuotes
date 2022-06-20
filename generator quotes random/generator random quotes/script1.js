const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
instagramBtn = document.querySelector(".instagram"),
synth = speechSynthesis;
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        var msg = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[3]; 
        synth.speak(msg);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});
instagramBtn.addEventListener("click", ()=>{
    let instagramUrl = `https://www.instagram.com/teguhdarmawan58/?url=${quoteText.innerText}`;
    window.open(instagramUrl, "_blank");
});
quoteBtn.addEventListener("click", randomQuote);