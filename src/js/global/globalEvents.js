// load in all images 
$(".fade-in-image img").on('load', function(){
  $(this).addClass('loaded')
}).each(function() {
  if(this.complete) $(this).load();
});

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
    var arrowImage = '<img src="https://cdn2.hubspot.net/hubfs/1609563/TRIBE%20Website%202018%20Assets/Global%20Assets/Right-1.svg" />';
    $(".newsletter-wrapper .hs_email .input").append('<submit ><span>SUBSCRIBE</span><span class="arrow-button"> ' + arrowImage + ' </span></submit>');
});