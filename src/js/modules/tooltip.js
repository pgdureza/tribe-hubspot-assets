
// on resize, reposition the tooltip
function positionTooltip(){
  var defaultSize = 320;

  // reset position to default
  $(".tip").each(function(){
    function setPosition(offset){
      el.css('left', 'calc(50% - ' + offset + 'px)')
    }
    var el = $(this);
    var offset = 160;
    setPosition(offset);
    if (el.offset().left + defaultSize > $(window).width()){
      do {
        offset = offset + 20;
        setPosition(offset);
      } while ((el.offset().left + defaultSize > $(window).width()))
    }
  });
}

$(window).on('resize', function(){
  positionTooltip();
});
  
positionTooltip();
