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
    scroll: $.debounce(1, function () {
      parallaxImg();
    }), ready: $.debounce(1, function () {
      parallaxImg();
    })
  });
});

$(".parallax-accent").each(function(){
  var img = $(this);
  var imgParent = $(this).parent();
  function parallaxImg () {
    if ($(window).width() < 900){
      img.css({
        transform: 'translate(0,0)'
      });
      return false;
    }
    var speed = -0.3;
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
      top: (imgPercent * 1.8 - 87) + '%'
    });
  }
  $(document).on({
    scroll: $.debounce(1, function () {
      parallaxImg();
    }), ready: $.debounce(1, function () {
      parallaxImg();
    })
  });
});
