//=include global/**/*.js


$(window).load(function(){
  
  function createWhoDoYouNeedDropDown(){
    // generate selectable values for 'who do you need' field
    var $select = $("<select>");
    var values = [];

    // create the select field and wrap in container div for styling
    $(".hs_who_do_you_need_2").prepend($select);
    $select.wrap("<div class='styled-dropdown'>");
    
    // generate options
    var initialValue = $(".hs_who_do_you_need_2 > label > span:first-of-type").text();
    values.push("<option value='' disabled selected>" + initialValue + "</option>");
    $(".hs_who_do_you_need_2 input").each(function(){
      values.push("<option value='" + $(this).val() + "'>" + $(this).val() + "</option>");
    });

    $select.html(values);

    // add eventhandlers 
    $select.on('change', function(){
      var selectedValue = $(this).val();
      $(".hs_who_do_you_need_2 input[value='"+selectedValue+"']").trigger('click');
    });

  }

  createWhoDoYouNeedDropDown();

  //=include modules/styled-dropdown.js
  //=include modules/autocomplete-countries.js

})