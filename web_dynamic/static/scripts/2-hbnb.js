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
