// polyfill objectfit
$(function () { objectFitImages() })

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
              // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") used to add commas
              $(this).text(Math.ceil(now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          }
      });
    })
  }); 

  // I know that the code could be better.
// If you have some tips or improvement, please let me know.

  $('.parallaxed-image img').each(function(){
    var img = $(this);
    var imgParent = $(this).parent();
    function parallaxImg () {
      var speed = img.closest(".parallaxed-image").data('speed');
      var imgY = imgParent.offset().top;
      var winY = $(this).scrollTop();
      var winH = $(this).height();
      var parentH = imgParent.innerHeight();


      // The next pixel to show on screen      
      var winBottom = winY + winH;

      // If block is shown on screen
      if (winBottom > imgY && winY < imgY + parentH) {
        // Number of pixels shown after block appear
        var imgBottom = ((winBottom - imgY) * speed);
        // Max number of pixels until block disappear
        var imgTop = winH + parentH;
        // Porcentage between start showing until disappearing
        var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
      }
      img.css({
        top: imgPercent + '%',
        transform: 'translate(-50%, -' + imgPercent + '%)'
      });
    }
    $(document).on({
      scroll: function () {
        parallaxImg();
      }, ready: function () {
        parallaxImg();
      }
    });
  });

});