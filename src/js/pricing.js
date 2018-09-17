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

  function setSocialSharingLinks(){
    $(".case-study-social-sharing a").each(function(){
      var href = $(this).attr('href');
      href = href.replace(/pricing/gi, "pricing" + encodeURIComponent(window.location.search));
      $(this).attr('href', href);
    });
  }

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
      setSocialSharingLinks();
    });

  }));

  $("form#pricing-inputs").trigger('change');

  //=include modules/case-study-details.js
  //=include modules/case-study-details-modal.js

  //=include modules/tooltip.js

});
