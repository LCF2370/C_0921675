/**
 * Student Name: Ralph Eimerson Ompoc
 * Student ID: c0921675
 * Date: April , 2024
 */

// Get the element by its ID
var paragraph = document.getElementById("cityNameValue");

// Get the text content of the element
var cityName = paragraph.textContent + " environment";

// Constant value for API URL, access key from Unsplash, category, 
//      size of the image, image height
const apiUrl = 'https://api.unsplash.com/photos/random';
const accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
const category = cityName;
const imageSize = 'regular';
const imageHeight = 500;

function fetchRandomImage() {
    //Constant value to fetch image from Unsplash
    const url = `${apiUrl}?client_id=${accessKey}&query=${category}&orientation=landscape&content_filter=high&featured=true&h=${imageHeight}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls[imageSize];
            document.getElementById('randomImage').src = imageUrl;
            document.getElementById('randomImage').height = imageHeight;
        })
        .catch(error => console.error('Error fetching random image:', error));
}

// Initial fetch
fetchRandomImage();

// Fetch a new image every 20 seconds
setInterval(fetchRandomImage, 20000);