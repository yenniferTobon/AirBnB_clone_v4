let list = {};
$( document ).ready(function() {
  let li_selector = 'div.amenities ul.popover li';
  let l = $(li_selector + ' input:checkbox').each(function(index) {
    $(this).click(function() {
      let dataId = $(this).parent().attr('data-id');
      if ($(this).prop('checked')) {
        list[dataId] = $(this).parent().text();
      } else {
        delete list[dataId];
      }
      //console.log(list);
      let h4 = $('div.amenities h4');
      h4.text('');
      for (let key in list) {
        h4.text(h4.text() + list[key] + ', ');
      }
    });
  });
});

$.getJSON('http://127.0.0.1:5001/api/v1/status/', function(data) {
    if (data['status'] === 'OK') {
      $('DIV#api_status').toggleClass('available')
    }
});

$.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: '{}',
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      success: function(data) {
        for (let key in data) {
          let place = data[key];
          $('section.places').append(
            '<article>' + 
            '<div class="title">' + 
              '<h2>' + place['name'] + '</h2>' +
              '<div class="price_by_night">' +
                place['price_by_night'] +
              '</div>' +
            '</div>' +
            '<div class="information">' +
              '<div class="max_guest">' +
                '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
                '<br/>' +
                place['max_guest'] + 'Guests' +
              '</div>' +
              '<div class="number_rooms">' +
                '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
                '<br />' +
                place['number_rooms'] + 'Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
                '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
                '<br/>' +
                place['number_bathrooms'] + 'Bathroom' +
              '</div>' +
            '</div>' +
            '<div class="description">' +
              place['description'] +
            '</div>' +
            '</article>');
        }
      }
});
