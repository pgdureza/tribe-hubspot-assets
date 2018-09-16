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


  // set default values here based on the hash


  // pricing ajax handler
  $("form#pricing-inputs").on('change', $.debounce(500, function () {

    // update the URL state
    window.history.pushState('', '', '/pricing?budget=' + $("[name='budget']").val() + '&category=' + $("[name='category']:checked").val());

    // loading animation
    $(".loading").addClass('show');
    $("#pricing-results").html("");

    // do ajax call
    var ajaxUrl = window.location.origin + window.location.pathname + "?" + $("form#pricing-inputs").serialize() + "&region=" + resources.country.code;
    $.get(ajaxUrl, function(data){
      $("#pricing-results").html($(data).find("#pricing-results").html());
      $(".loading").removeClass('show');      
      utilFunctions.formatNumber();
      utilFunctions.fadeInImages();
    });

  }));

  $("form#pricing-inputs").trigger('change');

});
