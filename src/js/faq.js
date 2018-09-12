//=include global/**/*.js


$(window).ready(function(){

  //=include modules/accordion-tabs.js
  //=include modules/field-with-icon.js

  // add search event handlers
  $("[name=q]").on('keyup', function(){
    var q = $(this).val();
    $(".accordion-content").show();
    if (!!q){
      $(".accordion-content:not(:containsIN('" + q + "'))").hide();
    }
    // sync the values of the non-visible search field
    $("[name=q]:not(:visible)").val(q);
  });
})