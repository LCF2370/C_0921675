/**
 * Student Name: Ralph Eimerson Ompoc
 * Student ID: c0921675
 * Date: April , 2024
          // Constant variable for acceskey and API URL of Unsplash
          const accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
          const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
  
          // Make a GET request to the Unsplash API
          $.get(apiUrl, function(response) {
              // Clear the view image container
              $('#viewImage').empty();
              var count = 0;
              // Loop through the response and display images
              // Loop through the response and display images to <div> container with an id="viewImage"
              response.results.forEach(function(photo) {
                  count += 1;
                  const imageUrl = photo.urls.regular;
                  if (count == 1){
                      //const imageElement = `<div class="carousel-item active"><img src="${imageUrl}" height="400" alt="Unsplash Image" class="rounded mx-auto d-block"></div>`;
                      const imageElement = `<div class="carousel-item active"><img src="${imageUrl}" height="400" width="600" alt="Unsplash Image" class="rounded mx-auto d-block"></div>`;
                      $('#viewImage').append(imageElement);
                  }
                  else{
                      //const imageElement = `<div class="carousel-item"><img src="${imageUrl}" height="400" alt="Unsplash Image" class="rounded mx-auto d-block"></div>`;
                      const imageElement = `<div class="carousel-item"><img src="${imageUrl}" height="400"  width="600" alt="Unsplash Image" class="rounded mx-auto d-block"></div>`;
                      $('#viewImage').append(imageElement);
                  }
              });
          });
 */

$(document).ready(function() {
    // Function to fetch images from Unsplash API
      function fetchImages() {
        // Constant value for API URL, access key from Unsplash, category, 
        //      size of the image, image height
        
        const query = $('#image-unsplash').val();
        const apiUrl = 'https://api.unsplash.com/photos/random';
        const accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
        const category = query;
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
    }
  
    // Event listener for the search button
    $('#image-unsplash').click(function() {
      // Constant variable for text value from <select> wiht an id="image-unsplash"
      const selectImage = $('#image-unsplash').val();
      if(selectImage != '' && selectImage != 'Select Category'){
          document.getElementById("viewImage-container").style.display = "block";
          fetchImages();
      }
      else{
          $("#error").html('Field cannot be empty')
          document.getElementById("viewImage-container").style.display = "none";
      }
    });
  });