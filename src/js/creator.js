//=include global/**/*.js

$(document).ready(function(){

  // get data
  $.get(resources.metrics_api, function(data){
    var payout_this_month;
    for (var i in data.monthly_paid_out){
      var payout = data.monthly_paid_out[i];
      if (payout.currency_code == resources.country.currency_code){
        payout_this_month = payout.amount;
        break;
      }
    }
    $(".animated-counter .counter").eq(0).data('value', data.total_briefs);
    $(".animated-counter .counter").eq(1).data('value', payout_this_month);

    // call the animated-counter init
    //=include modules/animated-counter.js
  })

  //=include modules/parallax-box.js
  //=include modules/featured-simage-silder.js
  //=include modules/testimonials.js
  //=include modules/brand-gallery.js

});