const amenities = {};
const states = {};
const cities = {};

$(document).ready(function () {

  // check for amenities checked

  const liSelector = 'div.amenities ul.popover li';
  $(liSelector + ' input:checkbox').each(function (index) {
    $(this).click(function () {
      const dataId = $(this).parent().attr('data-id');
      if ($(this).prop('checked')) {
        amenities[dataId] = $(this).parent().text();
      } else {
        delete amenities[dataId];
      }
      const h4 = $('div.amenities h4');
      h4.text('');
      console.log(amenities);
      for (const key in amenities) {
        h4.text(h4.text() + amenities[key] + ', ');
      }
    });
  });

  // check for states checked

  $('div.locations ul.popover h2 input:checkbox').each(function(index){
    $(this).click(function(){
      const dataId = $(this).parent().attr('data-id');
      if ($(this).prop('checked')) {
        states[dataId] = $(this).parent().text();
      } else {
        delete states[dataId];
      }
      const h4 = $('div.locations h4');
      h4.text('');
      console.log(states);
      for (const key in states) {
        h4.text(h4.text() + states[key] + ', ');
      }
    });
  });

  // check for cities checked
  $('div.locations ul.popover ul li input:checkbox').each(function(index){
    $(this).click(function(){
      const dataId = $(this).parent().attr('data-id');
      if ($(this).prop('checked')) {
        cities[dataId] = $(this).parent().text();
      } else {
        delete cities[dataId];
      }
      const h4 = $('div.locations h4');
      h4.text('');
      //console.log(cities);
      for (const key in cities) {
        h4.text(h4.text() + cities[key] + ', ');
      }
    });
  });
});

$.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('DIV#api_status').toggleClass('available');
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
  success: function (data) {
    appendPlaces(data);
  }
});
$(document).ready(function () {
  $('BUTTON').click(function () {
    $('.places').empty();
    const dataDict = {
      amenities: amenities,
      states: states,
      cities: cities
    };
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(dataDict),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        appendPlaces(data);
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});

function appendPlaces (data) {
  // console.log(data);
  for (const key in data) {
    const place = data[key];
    $('section.places').append(
      '<article>' +
            '<div class="title">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' +
                place.price_by_night +
              '</div>' +
            '</div>' +
            '<div class="information">' +
              '<div class="max_guest">' +
                '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
                '<br/>' +
                place.max_guest + 'Guests' +
              '</div>' +
              '<div class="number_rooms">' +
                '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
                '<br />' +
                place.number_rooms + 'Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
                '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
                '<br/>' +
                place.number_bathrooms + 'Bathroom' +
              '</div>' +
            '</div>' +
            '<div class="description">' +
              place.description +
            '</div>' +
            '</article>');
  }
}
