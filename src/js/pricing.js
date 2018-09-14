//=include global/**/*.js

$(document).ready(function(){
  //=include modules/styled-dropdown.js

  // event handler CTA override for calculate ROI
  $(document).on('click', ".pricing-cards > .hs_cos_wrapper:first-of-type a", function(e){
    e.preventDefault();
    $('html, body').animate({
          scrollTop: $(".pricing-calculator").offset().top
      }, 500);
  });

  // social sharing
  $(document).on('click', '.case-study-social-sharing-wrapper > a', function(e){
    e.preventDefault();
    $(".case-study-social-sharing").toggleClass('active');
  });


  // pricing ajax handler
  $("form#pricing-inputs").on('change', $.debounce(500, function () {
    var ajaxUrl = window.location.origin + window.location.pathname + "?" + $(this).serialize() + "&region=" + resources.country.code;
    console.log(ajaxUrl);
  }));

  $(window).on('hashchange', function(){

  })
})
