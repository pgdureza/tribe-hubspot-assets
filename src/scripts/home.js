$(document).ready(function(){
  // home video link
  $('a.home-video-link').on('click', function(e){
    e.preventDefault();
    $("#home-video-wrapper").modal({
      fadeDuration: 200,
      fadeDelay: 1,
      showClose: true
    });
  });

  // slider
  $("#home-jumbo-slider").slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 5000,
  });     

})