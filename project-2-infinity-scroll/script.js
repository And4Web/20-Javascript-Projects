const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
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

    imageContainer.appendChild(item);
    item.appendChild(img);
  });
}

const count = 30;
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

getPhotos();
