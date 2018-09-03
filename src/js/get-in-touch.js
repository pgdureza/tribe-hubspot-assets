//=include global/**/*.js

$(document).ready(function(){
  
  function createWhoDoYouNeedDropDown(){
    // generate selectable values for 'who do you need' field
    var $select = $("<select>");
    var values = [];

    // create the select field and wrap in container div for styling
    $(".hs_who_do_you_need_2").prepend($select);
    $select.wrap("<a href='#' class='styled-dropdown'>");
    
    // generate options
    var initialValue = $(".hs_who_do_you_need_2 > label > span:first-of-type").text();
    values.push("<option value='' disabled selected>" + initialValue + "</option>");
    $(".hs_who_do_you_need_2 input").each(function(){
      if ($(this).prop('checked')){
        values.push("<option selected value='" + $(this).val() + "'>" + $(this).val() + "</option>");
      } else {
        values.push("<option value='" + $(this).val() + "'>" + $(this).val() + "</option>");
      }
    });

    $select.html(values);

    // add eventhandlers 
    $select.on('change', function(){
      var selectedValue = $(this).val();
      $(".hs_who_do_you_need_2 input[value='"+selectedValue+"']").trigger('click');
    });

  }

  function generateCountriesDropDown(){
    var $select = $("<select>");
    var values = [];
    var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

    // create the select field and wrap in container div for styling
    $(".hs_country").prepend($select);
    $select.wrap("<a href='#' class='styled-dropdown'>");
    
    // generate options
    var initialValue = $(".hs_country > label > span:first-of-type").text();
    values.push("<option value='' disabled selected>" + initialValue + "</option>");
    var currentValue = $(".hs_country input").val();
    for (var i in countries){
      var country = countries[i];
      if (currentValue == country){
        values.push("<option selected value='" + country + "'>" + country + "</option>");
      } else {
        values.push("<option value='" + country + "'>" + country + "</option>");
      }
    }

    $select.html(values);

    // add eventhandlers 
    $select.on('change', function(){
      var selectedValue = $(this).val();
      $(".hs_country input").val(selectedValue).trigger('change');
    });
  }

  function hsFormLoaded(){
    createWhoDoYouNeedDropDown();
    generateCountriesDropDown();
    //=include modules/styled-dropdown.js
  }

  // create faux listener for when the contact-us form is loaded
  var waitingForForm = setInterval(function(){
    if ($("#hs_form_target_contact-us form").length >= 1){
      clearInterval(waitingForForm);
      hsFormLoaded();
    }
  }, 100)

})