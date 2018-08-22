// animated counter
$('.animated_counter .figure').each(function () {
  var el = this;
  var startingPoint = $(el).data('starts-at') || $(el).text();
  var value = $(el).data("value");
  var slowingPoint = $(el).data('slows-at');

  function animateCounter(start, end, duration, easing){
    $(el).appear(function(){
      $(el).prop('Counter', start).animate({
        Counter: end
      }, {
          duration: duration,
          easing: easing,
          step: function (now) {
              // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") used to add commas
              var newLine = Math.ceil(parseInt(now)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              $(this).text(newLine);
          }
      });
    })
  }

  animateCounter(startingPoint, slowingPoint, 4000, 'linear');
  animateCounter(slowingPoint, value, 20000, 'easeOutCubic');
  
}); 