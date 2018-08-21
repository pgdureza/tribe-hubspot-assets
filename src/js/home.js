//=include global/**/*.js

$(document).ready(function(){
  
  //=include modules/featured-simage-silder.js

  // home video link
  $('a.home-video-link').on('click', function(e){
    e.preventDefault();
    $("#home-video-wrapper").modal({
      fadeDuration: 200,
      fadeDelay: 1,
      showClose: true
    });
  });

})
