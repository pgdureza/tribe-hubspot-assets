// animated counter
$('.animated-counter').each(function () {
  var el = this;
  var startingPoint = $(el).find('.counter').data("value");
  var suffix = $(el).find('.counter').data("suffix") || "";

  function triggerAnimation(counter, transitionSpeed){
    $(el).find(".mask-skew.current").addClass('animating');
    $(el).find(".mask-skew.next").addClass('animating');
    setTimeout(function(){
      // remove animation related classes and reset the 'next' mask to be current
      $(el).find(".mask-skew.current").remove();
      $(el).find(".mask-skew.next").removeClass('next').removeClass('animating').addClass('current');
      createNextElement(counter, suffix, "next");
      // generate new 'next' mask
    }, transitionSpeed)
  }

  function createNextElement(counter, suffix, className){
    var content = Math.ceil(parseInt(counter)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
    $(el).find(".mask-track").append('<div class="mask-skew ' + className + '"><div class="mask">' + content + '</div></div>');
  }

  function animateCounter(start, end, tickSpeed, transitionSpeed){
    var counter = start;
    // generate initial "current" and 'next' elements
    $(el).find(".mask-skew.current").remove(); // remove initial blank placeholder
    createNextElement(counter, suffix, "current")
    counter++;
    createNextElement(counter, suffix, "next")
    var tickInterval = setInterval(function(){
      counter++;
      triggerAnimation(counter, transitionSpeed)
      if (counter > end){
        clearInterval(tickInterval);
      }
    }, tickSpeed)
  }

  $(el).appear(function(){
    animateCounter((startingPoint - 10), startingPoint, 1000, 500);
    console.log('appeared');
  });

}); 

