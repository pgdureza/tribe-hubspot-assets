//=include global/**/*.js

$(document).ready(function(){

  //=include modules/hs-forms.js
  hsForm("#hs_form_target_book-a-demo", function (){
    prepFormSelectsAsStyledDropdown("#hs_form_target_book-a-demo");
    createDropdownFromValueForTextbox(".hs_country", window.resources.countries);
    createDropdownFromValueForTextbox(".hs_influencer_category", window.resources.categories);
  });

})