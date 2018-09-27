//=include global/**/*.js

$(document).ready(function(){

  // who do you need is a radiobox, need to convert into select element
  function createWhoDoYouNeedDropDown(){
    // generate selectable values for 'who do you need' field
    var $select = $("<select>");
    var values = [];

    // create the select field and wrap in container a for styling
    $(".hs_who_do_you_need_2").prepend($select);
    $select.wrap("<a href='#' class='styled-dropdown'>");
    
    // generate options
    var initialValue = $(".hs_who_do_you_need_2 > label > span:first-of-type").text();
    values.push("<option value='' disabled selected>" + initialValue + "</option>");
    $(".hs_who_do_you_need_2 input").each(function(){
      if ($(this).prop('checked')){
        values.push("<option selected value='" + $(this).val() + "'>" + $(this).parent().text() + "</option>");
      } else {
        values.push("<option value='" + $(this).val() + "'>" + $(this).parent().text() + "</option>");
      }
    });

    $select.html(values);

    // add eventhandlers 
    $select.on('change', function(){
      var selectedValue = $(this).val();
      $(".hs_who_do_you_need_2 input[value='"+selectedValue+"']").trigger('click');
    });

  }
  //=include modules/hs-forms.js
    
  hsForm("#hs_form_target_contact-us", function (){
    createWhoDoYouNeedDropDown();
    createDropdownFromValueForTextbox(".hs_country", window.resources.countries);
  });

})