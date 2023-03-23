const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready: ", ready);
    count = 30;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images: ", totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    const img = document.createElement("img");

    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    imageContainer.appendChild(item);
    item.appendChild(img);
  });
}

let count = 5;
const api_key = "_bEOuK0eAx_uVoRU1QM67SOYmkfx8v2ZVMi9ndRPu5k";
const api_url = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(api_url);
    photosArray = await response.json();
    displayPhotos();
    console.log(photosArray);
  } catch (error) {
    console.log("Error: ", error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("load more");
  }
});

getPhotos();
