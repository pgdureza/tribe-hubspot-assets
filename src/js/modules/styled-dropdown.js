// generate the styled dropdown clone
$(".styled-dropdown").each(function(){

  // create the menu items
  var $values = $("<div class='values'>");
  var selected;
  $(this).find("select option").each(function(){
    var $option = $(this);
    var classes = "value ";
    if ($option.prop('selected')){
      classes += "selected ";
      selected = $option.text();
    }

    if ($option.prop('disabled')){
      classes += "disabled ";
    }

    $values.append("<div class='" + classes + "' data-value='" + $option.val() + "'><span>" + $option.text() + "</span></div>");
  });

  $(this).append("<div class='selected-value'><span>"+selected+"</span></div>");

  // append menu items to dropdown container
  $(this).append($values);
})


// clicking on the dropdown opens the menu
$(".styled-dropdown").on('click', function(e){
  e.preventDefault();
  var $container = $(this);
  if ($container.hasClass("active")){
    // close all
    $(".styled-dropdown").removeClass('active');
    $container.find(".values").slideUp(300);
  } else {
    $(".styled-dropdown").removeClass('active');
    $(".styled-dropdown").find(".values").slideUp(300);
    $container.addClass('active');
    $container.find(".values").slideDown(300);
  }
});

// clicking outside the dropdown closes all active dropdowns
$(document).on('click', function(e){
  var $container  = $(".styled-dropdown");
  if ($container.hasClass("active") && !$container.is(e.target) && $container.has(e.target).length === 0) {
    $container.removeClass('active')
    $container.find(".values").slideUp(300);
  }
});

// clicking on the values triggers a change in the original dropdown
$(".styled-dropdown .values .value").on('click', function(){
  // TODO add handling for multiselect

  // disable click on disabled
  if ($(this).hasClass('disabled')){
    return false;
  }

  var $option = $(this);
  var $container = $option.closest(".styled-dropdown");
  // update displayed text
  $container.find(".selected-value").text($option.text());
  // update selected value for the select element
  $container.find("select").val($option.data('value'));
  $container.find("select").trigger('change');
  // update the selected 
  $container.find(".value.selected").removeClass('selected');
  
  $option.addClass('selected');

  // close current selected
  $container.removeClass('active');
  $container.find('.values').slideUp(300);

  return false;
});