//=include global/**/*.js

$(document).ready(function(){

  // get data
  $.get(resources.metrics_api, function(data){
      // replace all the data from COS with the realtime data
      $(".animated-counter .counter").eq(0).data('value', data.total_influencers);
      $(".animated-counter .counter").eq(1).data('value', data.total_briefs);
      
      // call the animated-counter init
      //=include modules/animated-counter.js
  })


  //=include modules/parallax-box.js
  //=include modules/featured-simage-silder.js
  //=include modules/testimonials.js

  //=include modules/case-study-details.js
  //=include modules/case-study-details-modal.js

});