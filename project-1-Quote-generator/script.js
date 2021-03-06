let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let quoteAuthor = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let nextQuoteBtn = document.getElementById("next-quote");
let loader = document.getElementById("loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// get quote from API
async function getQuote() {
  loading();
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // const apiUrl =
  // "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    let randomIndex = Math.floor(Math.random() * 1600);
    quoteText.innerText = data[randomIndex].text;
    if (data[randomIndex].author === null) {
      quoteAuthor.innerText = "- " + "Unknown";
    } else {
      quoteAuthor.innerText = "- " + data[randomIndex].author;
    }
    if (data[randomIndex].text.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    console.log(data[randomIndex].text.length);
    complete();
  } catch (error) {
    console.log("Error: ", error);
  }
}

function twitterPost() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const tweetPostUrl = `https://twitter.com/intent/tweet?text=${quote}${author}`;

  window.open(tweetPostUrl, "_blank");
}

twitterBtn.addEventListener("click", twitterPost);
nextQuoteBtn.addEventListener("click", getQuote);

//on Load
getQuote();
