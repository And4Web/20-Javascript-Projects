const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Show content
function showContent(page){
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  });

  if(page === 'results'){
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  }else{
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }

  loader.classList.add('hidden');
}

// create DOM nodes
function createDOMNodes(page){
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
 
    currentArray.forEach((result, index)=>{
      // Card container
      const card = document.createElement('div');
      card.classList.add('card');
      // Link
      const link = document.createElement('a');
      link.href = result.hdurl;
      link.title = 'View full image';
      link.target = '_blank';
      // Image
      const image = document.createElement('img');
      image.src = result.url;
      image.alt = 'NASA Picture of the day';
      image.loading = 'lazy';
      image.classList.add('card-image-top');
      // Card Body
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      // Card Title
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = result.title;
      // Save Text
      const saveText = document.createElement('p');
      saveText.classList.add('clickable');
      saveText.textContent = page === 'results' ? 'Add to Favorites' : 'Remove Favorite';
      saveText.setAttribute('onclick', page === 'results' ? `saveFavorite('${result.url}')` : `removeFavorite('${result.url}')`);
      // Card Text
      const cardText = document.createElement('p');
      cardText.textContent = result.explanation;
      // Footer Container
      const footer = document.createElement('small');
      footer.classList.add('text-muted');
      // Date
      const date = document.createElement('strong');
      date.textContent = result.date;
      // Copyright
      const copyrightResult = result.copyright === undefined ? ' No Copyrights' : result.copyright; 
      const copyright = document.createElement('span');
  
      copyright.textContent = ` ${copyrightResult}`
  
      // Append
      footer.append(date, copyright);
      cardBody.append(cardTitle, saveText, cardText, footer);
      link.appendChild(image);
      card.append(link, cardBody);
      imagesContainer.appendChild(card);
     
    });
}

function updateDOM(page){
  // Get Favorites from local storage
  if(localStorage.getItem('nasaFavorites')){
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }

  imagesContainer.textContent = '';

  createDOMNodes(page);  
  // Hide Loader
  showContent(page);
}

// Get 10 images from NASA API
async function getNASAPictures(){
  try {
    // Show Loader
    loader.classList.remove('hidden');

    const response = await fetch(apiURL);
    resultsArray = await response.json();

    updateDOM('results')    
  } catch (error) {
    // Catch Error here
    console.log(error);
    // Hide Loader
    loader.classList.add('hidden');
  }
}

// Add result to Favorites
function saveFavorite(itemUrl){
  // Loop through results array to select favorites
  resultsArray.forEach(item=>{
    if(item.url.includes(itemUrl) && !favorites[itemUrl]){
      favorites[itemUrl] = item;

      // Show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(()=>{
        saveConfirmed.hidden = true;
      }, 2000);

      // Set favorites in local storage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    }
  })
}

// Remvoe items from Favorites
function removeFavorite(itemUrl){
  if(favorites[itemUrl]){
    delete favorites[itemUrl];
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));

    updateDOM('favorites');
    if(favorites.length === 0){
      localStorage.removeItem('nasaFavorites');
    }
  }
}

// On load
getNASAPictures();
