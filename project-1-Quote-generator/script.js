let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let quoteAuthor = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let nextQuoteBtn = document.getElementById("next-quote");
let loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// get quote from API
async function getQuote() {
  showLoadingSpinner();
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // const apiUrl =
  // "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //console.log('data >>> ', data)
    let randomIndex = Math.floor(Math.random() * 1600);
    quoteText.innerText = data[randomIndex].text;
    // if author field is empty, add 'Anonymous':
    if (data[randomIndex].author === null) {
      quoteAuthor.innerText = "- " + "Anonymous";
    } else {
      quoteAuthor.innerText = "- " + data[randomIndex].author;
    }
    // if quote length is larger reduce the font size:
    if (data[randomIndex].text.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    removeLoadingSpinner();
  } catch (error) {
    console.log("Error: ", error);
  }
}

function twitterPost() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const tweetPostUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(tweetPostUrl, "_blank");
}

twitterBtn.addEventListener("click", twitterPost);
nextQuoteBtn.addEventListener("click", getQuote);

//on Load
getQuote();
