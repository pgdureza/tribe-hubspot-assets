// gallery slider
function initSlick(){
  $(".slick-image-slider").slick({
    arrows: true,
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    dots: true,
    infinite: false,
    fade: true,
    speed: 500,
  });

  // lazyload videos
  $("video [data-lazy]").each(function(){
    $(this).attr('src', $(this).data('lazy'));
    $(this).removeAttr('data-lazy');
    $(this).parent().load()
  })
}

function initSocialSharing(){
  // social sharing
  $(document).on('click', '.case-study-social-sharing-wrapper > a', function(e){
    e.preventDefault();
    $(".case-study-social-sharing").toggleClass('active');
  });
}

function initScrollHandler(){
  $(".case-study-details-section").off().scroll($.throttle(500, function () {
    if ($(this).scrollTop() >= $(".mobile-cover-photo").height()){
      $(".close-modal").addClass("invert");
      $(".case-study-social-sharing-wrapper").addClass("gray");
    } else {
      $(".close-modal").removeClass("invert");
      $(".case-study-social-sharing-wrapper").removeClass("gray");
    }
  }));
}