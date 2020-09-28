document.addEventListener('DOMContentLoaded', function () {
  const selected = {};
  const slist = []
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      selected[$(this).data('id')] = $(this).data('name');
      slist.push($(this).data('id'));
    } else {
      delete selected[$(this).data('id')];
      slist.splice(slist.indexOf($(this).data('id')), 1);
    }
    $('div.amenities h4').text(Object.values(selected).join(', '));
  });
  $(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  });
  $(function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      success: function (data) {
        $(data).each(function (index, place) {
           $('SECTION.places').append('<article><div class="title_box"><h2>'
          + place.name + '<h2><div class="price_by_night">$' + place.price_by_night + '</div></div>'
          + '<div class="information"><div class="max_guest">' + place.max_guest + 'Guests</div>'
          + '<div class="number_rooms">' + place.number_rooms + 'Bedrooms</div>'
          + '<div class="number_bathrooms">' + place.number_bathrooms + 'Bathroom</div></div>'
          + '<div class="user"><b>Owner: </b>' + 'not handled yet' + '</div>'
          + '<div class="description">' + place.description + '</div></article>')
        });
      }
    });
  });
  $('.filters button').click(function () {
    $('SECTION.places').empty();
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': slist}),
      success: function (data) {
        $(data).each(function (index, place) {
          $('SECTION.places').append('<article><div class="title_box"><h2>'
          + place.name + '<h2><div class="price_by_night">$' + place.price_by_night + '</div></div>'
          + '<div class="information"><div class="max_guest">' + place.max_guest + 'Guests</div>'
          + '<div class="number_rooms">' + place.number_rooms + 'Bedrooms</div>'
          + '<div class="number_bathrooms">' + place.number_bathrooms + 'Bathroom</div></div>'
          + '<div class="user"><b>Owner: </b>' + 'not handled yet' + '</div>'
          + '<div class="description">' + place.description + '</div></article>')
        });
      }
    });
  });
});

