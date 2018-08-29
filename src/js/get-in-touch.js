//=include global/**/*.js

$(window).load(function(){
  
  function createWhoDoYouNeedDropDown(){
    // generate selectable values for 'who do you need' field
    var $select = $("<select>");
    var values = [];

    // create the select field
    $(".hs_who_do_you_need_2").append($select);
    
    // generate options
    var initialValue = "<option value='' disabled selected>" + $(".hs_who_do_you_need_2 > label > span:first-of-type").text() + "</option>";
    values.push(initialValue);
    $(".hs_who_do_you_need_2 input").each(function(){
      values.push("<option>" + $(this).val() + "</option>");
    });

    $select.html(values);

    // add eventhandlers 
    $select.on('change', function(){
      var selectedValue = $(this).val();
      $(".hs_who_do_you_need_2 input[value='"+selectedValue+"']").trigger('click');
    });
  }

  createWhoDoYouNeedDropDown();

})