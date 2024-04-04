$(document).ready(function() {
  // Function to fetch images from Unsplash API
  function fetchImages(query) {
      const accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
      const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

      // Make a GET request to the Unsplash API
      $.get(apiUrl, function(response) {
          // Clear the image container
          $('#searched-image').empty();

          // Loop through the response and display images
          response.results.forEach(function(photo) {
              const imageUrl = photo.urls.regular;
              const imageElement = `<img src="${imageUrl}" alt="Unsplash Image">`;
              $('#searched-image').append(imageElement);
          });
      });
  }

  // Event listener for the search button
  $('#search-image').click(function() {
      const searchQuery = $('#image-unsplash').val();
      fetchImages(searchQuery);
  });
});
