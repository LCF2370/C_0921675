$(document).ready(function() {
  // Function to fetch images from Unsplash API
    function fetchImages(query) {
        const accessKey = 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w';
        const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

        // Make a GET request to the Unsplash API
        $.get(apiUrl, function(response) {
            // Clear the view image container
            $('#viewImage').empty();
            var count = 0;
            // Loop through the response and display images
            response.results.forEach(function(photo) {
                count += 1;
                const imageUrl = photo.urls.regular;
                if (count == 1){
                    const imageElement = `<div class="carousel-item active"><img src="${imageUrl}" height="400" alt="Unsplash Image" class="rounded mx-auto d-block"></div>`;
                    $('#viewImage').append(imageElement);
                }
                else{
                    const imageElement = `<div class="carousel-item"><img src="${imageUrl}" height="400" alt="Unsplash Image" class="rounded mx-auto d-block"></div>`;
                    $('#viewImage').append(imageElement);
                }
            });
        });
  }

  // Event listener for the search button
  $('#image-unsplash').click(function() {
    const searchImage = $('#image-unsplash').val();
    if(searchImage != '' && searchImage != 'Select Category'){
        document.getElementById("viewImage-container").style.display = "block";
        fetchImages(searchImage);
    }
    else{
        $("#error").html('Field cannot be empty')
        document.getElementById("viewImage-container").style.display = "none";
    }
  });
});
