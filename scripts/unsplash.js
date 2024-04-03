// Get the element by its ID
var paragraph = document.getElementById("cityNameValue");

// Get the text content of the element
var cityName = paragraph.textContent + "city";

const apiUrl = 'https://api.unsplash.com/photos/random';
const accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
const category = cityName; // Replace with your desired category
const imageSize = 'regular'; // Replace with your desired image size (e.g., 'regular', 'small', 'thumb')
const imageHeight = 500; // Specify the desired image height in pixels

function fetchRandomImage() {
    const url = `${apiUrl}?client_id=${accessKey}&query=${category}&orientation=landscape&content_filter=high&featured=true&h=${imageHeight}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls[imageSize];
            document.getElementById('randomImage').src = imageUrl;
            document.getElementById('randomImage').height = imageHeight; // Set the image height
        })
        .catch(error => console.error('Error fetching random image:', error));
}

// Initial fetch
fetchRandomImage();

// Fetch a new image every 20 seconds
setInterval(fetchRandomImage, 20000);