
$(document).ready(function(){

  // burger menu
  $(".hamburger").click(function(){
    $("body").toggleClass("mobile-menu-open");
  });
  
  // animated counter
  $('.animated_counter').each(function () {
    var el = this;
    $(el).appear(function(){
      $(el).prop('Counter',0).animate({
        Counter: $(this).data("value")
      }, {
          duration: 2000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    })
  }); 

});