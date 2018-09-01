//=include global/**/*.js


$(window).ready(function(){

  //=include modules/accordion-tabs.js
  //=include modules/field-with-icon.js

  // add search event handlers
  $("[name=q]:visible").on('keyup', function(){
    var q = $(this).val();
    $(".accordion-content").show();
    if (!!q){
      $(".accordion-content:not(:containsIN('" + q + "'))").hide();
    }
  });
})