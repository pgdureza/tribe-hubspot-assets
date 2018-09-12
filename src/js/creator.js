//=include global/**/*.js

$(document).ready(function(){

  // get data
  setTimeout(function(){
    // replace all the data from COS with the realtime data
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
  }, 1000)

  //=include modules/parallax-box.js
  //=include modules/featured-simage-silder.js
  //=include modules/testimonials.js
  //=include modules/brand-gallery.js

});

var data = {
  monthly_paid_out: [{
      amount: 647205,
      currency_code: "AUD"
    },
    {
      amount: 461125,
      currency_code: "USD"
    },
    {
      amount: 354339,
      currency_code: "GBP"
    },
    {
      amount: 397499,
      currency_code: "EUR"
    }
  ],
  total_briefs: 11126,
  total_influencers: 42549,
  total_paid_out: [{
      amount: 9506620,
      currency_code: "AUD"
    },
    {
      amount: 6773353,
      currency_code: "USD"
    },
    {
      amount: 5204797,
      currency_code: "GBP"
    },
    {
      amount: 5838761,
      currency_code: "EUR"
    }
  ],
  total_submissions: 325469
}