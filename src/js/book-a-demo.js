//=include global/**/*.js

$(document).ready(function(){
  
  function hsFormLoaded(){
    //=include modules/styled-dropdown.js
    validateDropdowns();
  }

  function validateDropdowns(){
    $("#hs_form_target_contact-us form").on('submit', function(){
      setTimeout(function(){ // need settimeout to trigger after the other submit validations
        $(".styled-dropdown").each(function(){
          if ($(this).siblings('.hs-error-msgs').length >= 0){
            $(this).addClass('error');
          }
        })
      }, 0);
    })

    $(".styled-dropdown").on('change', function(){
      $(this).removeClass('error');
    })
  }

  // create faux listener for when the contact-us form is loaded
  var waitingForForm = setInterval(function(){
    if ($("#hs_form_target_contact-us form").length >= 1){
      clearInterval(waitingForForm);
      hsFormLoaded();
    }
  }, 100)

})