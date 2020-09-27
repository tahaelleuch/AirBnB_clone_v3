document.addEventListener('DOMContentLoaded', function () {
  const selected = {};
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      selected[$(this).data('id')] = $(this).data('name');
    } else {
      delete selected[$(this).data('id')];
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
});

