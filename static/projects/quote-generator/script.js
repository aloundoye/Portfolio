const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function loading() {
	loader.hidden = false;
    quoteContainer.hidden = true ;
}
//hide loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
//Get Quote from forismatic api
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if Author is blank, add 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerHTML = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else {
            quoteText.classList.remmove('long-quote');
         }
        quoteText.innerText = data.quoteText;
        //stop loader
        complete();
    }catch (error) {
        getQuote();
    }
}

//tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
