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
});
