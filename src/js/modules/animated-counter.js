// animated counter
$('.animated-counter').each(function () {
  var el = this;
  var $counter = $(el).find('.counter');
  var hasCountrySpecificValues = $counter.data('country-specific-values');
  var showCurrency = $counter.data('show-currency');
  var shorten = $counter.data('shorten');
  var startingPoint = $counter.data('value').toString().replace(/,/g, '');

  if (hasCountrySpecificValues){
    var values = $counter.data('country-specific-values').split(",");
    for (var i in values){
      var countryData = values[i].split("-");
      if (countryData[0] == resources.country.code) {
        startingPoint = countryData[1].toString().replace(/,/g, '');
      }
    }
  }

  var suffix = "";
  if (shorten){
    // add commas then split
    var commaSeparated = Math.ceil(parseInt(startingPoint)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(",");
    if (commaSeparated.length == 2){
      suffix = "k"
    } else if (commaSeparated.length == 3){
      suffix = "M"
    }
    startingPoint = commaSeparated[0];
  }

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
    if (showCurrency){ // probably add handling for non global source in the future 
      content = resources.country.currency_symbol + content ;
    }
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
    animateCounter((startingPoint - 10), startingPoint, 1000, 300);
  });

}); 

