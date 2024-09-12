const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//unsplash API
const count = 30;
const apiKey = 'nx0BrGGGuHCc10QfNV7jeu-OmEoOSqqw8ZZ5T_QuI0E';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    loader.hidden = true;
}
// create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    // Run function for Each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        // Create <img> for photo
        const img = document.createElement('img')
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        img.addEventListener('load', imageLoaded);
        //put <img> inside then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
        console.log('load more');
    }
});

getPhotos();