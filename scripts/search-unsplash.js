/**
 * Student Name: Ralph Eimerson Ompoc
 * Student ID: c0921675
 * Date: April 9, 2024
 */
$(document).ready(function() {
    // Function to fetch images from Unsplash API
    /*Constant value for API URL, access key from Unsplash, 
    * category, size of the image, image height
    */
    var apiUrl = 'https://api.unsplash.com/photos/random';
    var accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
    var imageSize = 'regular';
    var imageHeight = 500;
    function fetchImages() {
      let query = $('#image-unsplash').val();
      var category = query;
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
    fetchImages();
    // Setting interval by 20 seconds to change in ramdom images base on category
    setInterval(fetchImages, 20000);
  
    // An event listener for the select type input box
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