// generate the styled dropdown clone
$(".styled-dropdown").each(function(){

  var isMultiselect = $(this).hasClass('multi-select');

  // create the menu items
  var $values = $("<div class='values'>");
  var selected;
  if (isMultiselect){
    $(this).find(".checkbox").each(function(){
      var $option = $(this);
      var classes = "value ";
      if ($option.find('input').prop('checked')){
        classes += "selected ";
        selected = $option.text();
      }
  
      if ($option.prop('disabled')){
        classes += "disabled ";
      }
  
      $values.append("<div class='" + classes + "' data-value='" + $option.find('input').val() + "'><span>" + $option.find('label').text() + "</span></div>");
    });
  } else {
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
  }
  

  $(this).append("<div class='selected-value'><span>"+selected+"</span></div>");

  // append menu items to dropdown container
  $(this).append($values);
});


// clicking on the dropdown opens the menu
$(".styled-dropdown").on('click', function(e){
  e.preventDefault();
  var $container = $(this);
  if ($container.hasClass("active")){
    // close selected
    $container.removeClass('active');
    $container.find(".values").slideUp(300);
    if ($container.hasClass('multi-select')){
      $container.find('input').trigger('change');
    }
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
$(".styled-dropdown:not(.multi-select) .values .value").on('click', function(){

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


// on click, check the hidden checkbox
$(".styled-dropdown.multi-select .values .value").on('click', function(){

  var $option = $(this);
  var $container = $option.closest(".styled-dropdown");

  // clicking on all selected clears the other selection
  if (!$(this).data('value')){
    $container.find('.selected').removeClass('selected');
    $container.find('input[type="checkbox"]').prop('checked', false);
    $option.addClass('selected');
  } else { // any other option was selected
    $container.find('[data-value=""]').removeClass('selected');
    $option.toggleClass('selected');
    $container.find("input[value='" + $option.data('value') + "']").prop('checked', $option.hasClass('selected'));
  }
  
  // if no items remaining after selecting, reselect 'all categories'
  if ($container.find('.value.selected').length <= 0){
    $container.find('[data-value=""]').addClass('selected');
  }

  // update displayed text
  if ($container.find(".value.selected").length < 2){
    $container.find(".selected-value").text($container.find(".value.selected").text());
  } else {
    $container.find(".selected-value").text($container.find(".value.selected").length + " selected");
  }

  return false;
});

// trigger multi select change
$(".multi-select").on('blur', function(){
	if ($(this).hasClass('active')){
		$(".multi-select input").trigger('change');
	}
});