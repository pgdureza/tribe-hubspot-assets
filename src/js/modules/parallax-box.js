
$(".parallax-box").each(function(){
  var box = $(this);
  var boxParent = $(this).parent();
  function parallaxImg () {
    if ($(window).width() < 900){
      box.css({
        transform: 'translate(0,0)'
      });
      return false;
    }
    var speed = box.data('speed');
    var boxY = boxParent.offset().top;
    var winY = $(this).scrollTop();
    var winH = $(this).height();
    var parentH = boxParent.innerHeight();

    // The next pixel to show on screen      
    var winBottom = winY + winH;

    // If block is shown on screen
    if (winBottom > boxY && winY < boxY + parentH) {
      // Number of pixels shown after block appear
      var boxBottom = ((winBottom - boxY) * speed);
      // Max number of pixels until block disappear
      var boxTop = winH + parentH;
      // Porcentage between start showing until disappearing
      var boxPercent = ((boxBottom / boxTop) * 100) + (50 - (speed * 50));
    }
    box.css({
      top: (boxPercent * 1.8 - 87) + '%'
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
