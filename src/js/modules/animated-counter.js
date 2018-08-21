// animated counter
$('.animated_counter .figure').each(function () {
  var el = this;
  $(el).appear(function(){
    $(el).prop('Counter',0).animate({
      Counter: $(this).data("value")
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") used to add commas
            var newLine = Math.ceil(parseInt(now)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            $(this).text(newLine);
        }
    });
  })
}); 