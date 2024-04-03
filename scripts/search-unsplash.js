
$(document).ready(function() {
    $('#search-image').submit(function(event) {
      event.preventDefault();

      var query = $('#image-unsplash').val();

      $.ajax({
        url: 'https://api.unsplash.com/search/photos',
        method: 'GET',
        data: {
          query: query,
          client_id: 'S0rQa8LyyPQBT-Q0KXHxLHYE1T_nHUbJMsgMoiphF4w'
        },
        success: function(data) {
          $('#searched-image').empty();

          $.each(data.results, function(index, photo) {
            var img = $('<img>').attr('src', photo.urls.small).attr('alt', photo.alt_description);
            $('#searched-image').append(img);
          });
        },
        error: function(xhr, status, error) {
          console.error('Error fetching images:', error);
        }
      });
    });
  });