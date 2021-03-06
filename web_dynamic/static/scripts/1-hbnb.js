const list = {};
$(document).ready(function () {
  const liSelector = 'div.amenities ul.popover li';
  $(liSelector + ' input:checkbox').each(function (index) {
    $(this).click(function () {
      const dataId = $(this).parent().attr('data-id');
      if ($(this).prop('checked')) {
        list[dataId] = $(this).parent().text();
      } else {
        delete list[dataId];
      }
      // console.log(list);
      const h4 = $('div.amenities h4');
      h4.text('');
      for (const key in list) {
        h4.text(h4.text() + list[key] + ', ');
      }
    });
  });
});
