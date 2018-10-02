//=include global/**/*.js

$(document).ready(function() {
  //=include modules/featured-image-silder.js
  //=include modules/home-video.js

  // get data
  $.get(resources.metrics_api, function(data) {
    // replace all the data from COS with the realtime data
    $('.animated-counter .counter')
      .eq(0)
      .data('value', data.total_briefs);

    // call the animated-counter init
    //=include modules/animated-counter.js
  });

  //=include modules/case-study-details.js
  //=include modules/case-study-details-modal.js
});
