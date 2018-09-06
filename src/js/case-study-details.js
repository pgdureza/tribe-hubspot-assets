//=include global/**/*.js

$(document).ready(function(){

  // gallery slider
  $(".slick-image-slider").slick({
    arrows: true,
    slidesToShow: 1,
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
  });

  // social sharing
  $(document).on('click', '.case-study-social-sharing-wrapper a', function(){
    $(".case-study-social-sharing").toggleClass('active');
  });

});