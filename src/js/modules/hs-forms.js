function hsForm(hs_form_wrapper, callback){
  
  function hsFormLoaded(){
    if (callback){ // use this to call additional functions once the form is loaded
      callback();
    }
    //=include styled-dropdown.js
    styleCheckboxes();
    validateDropdowns();
  }

  function styleCheckboxes(){
    // style the checkbox
    $(hs_form_wrapper).find("form").find("input[type='checkbox']").each(function(){
      var el = $(this);
      el.parent().addClass("styled-checkbox");
      el.after("<span class='checkbox'>")
    })
  }
  
  function validateDropdowns(){
    $(hs_form_wrapper).find("form").on('submit', function(){
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
    if ($(hs_form_wrapper).find("form").length >= 1){
      clearInterval(waitingForForm);
      hsFormLoaded();
    }
  }, 100)

}

/** UTIL FUNCTIONS THAT CAN BE USED ON CALLBACK FUNCTION */

// util function to wrap each select with a "styled-dropdown" class
// this styled-dropdown.js will still handle the actual converting to custom dropdown
function prepFormSelectsAsStyledDropdown(selector){ 
  $(selector).find('select').each(function(){
    $(this).wrap("<a href='#' class='styled-dropdown'>");
  });
}

// util function for creating a dropdown for a text input
function createDropdownFromValueForTextbox(selector, options){
  var $select = $("<select>");
  var values = [];

  // create the select field and wrap in container div for styling
  $(selector).prepend($select);
  $select.wrap("<a href='#' class='styled-dropdown'>");
  
  // generate options
  var initialValue = $(selector).find("> label > span:first-of-type").text();
  values.push("<option value='' disabled selected>" + initialValue + "</option>");
  var currentValue = $(selector).find("input").val();
  for (var i in options){
    var option = options[i];
    if (currentValue == option){
      values.push("<option selected value='" + option + "'>" + option + "</option>");
    } else {
      values.push("<option value='" + option + "'>" + option + "</option>");
    }
  }

  $select.html(values);

  // add eventhandlers 
  $select.on('change', function(){
    var selectedValue = $(this).val();
    $(selector).find("input").val(selectedValue).trigger('change');
  });
}