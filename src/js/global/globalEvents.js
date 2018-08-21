
$(document).ready(function(){

  // polyfill objectfit
  objectFitImages()
  // burger menu
  $(".hamburger").click(function(){
    $("body").toggleClass("mobile-menu-open");
  });

});

$(window).load(function(){
    // appends newsletter arrow
    $(".newsletter-wrapper .hs_email .input").append('<submit ><span>SUBSCRIBE</span><span class="arrow-button"> </span></submit>');
});