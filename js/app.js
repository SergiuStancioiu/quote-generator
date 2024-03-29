const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

let apiQuotes = [];
//Show Loading
function loading() {
  loader.hidden = false;

  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
//Show New Quote
function newQuote() {
  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author field is blank and replace it with 'Unknown'
  if (quote.author === null) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    //Catch Error Here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuotes();
