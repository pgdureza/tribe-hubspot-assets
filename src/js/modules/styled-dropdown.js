// generate the styled dropdown clone
$(".styled-dropdown").each(function(){

  var isMultiselect = $(this).hasClass('multi-select');
  var isSelection = $(this).hasClass('selection');

  // create the menu items
  var $values = $("<div role='listbox' class='values'>");
  var selected;
  var initValue;
  if (isMultiselect || isSelection){
    $(this).find(".checkbox").each(function(){
      var $option = $(this);
      var classes = "value ";
      if ($option.find('input').prop('checked')){
        classes += "selected ";
        selected = $option.text();
        initValue = $option.val();
      }
  
      if ($option.prop('disabled')){
        classes += "disabled ";
      }
  
      $values.append("<div role='option' class='" + classes + "' data-value='" + $option.find('input').val() + "'><span>" + $option.find('label').text() + "</span></div>");
    });
  } else {
    $(this).find("select option").each(function(){
      var $option = $(this);
      var classes = "value ";
      if ($option.prop('selected')){
        classes += "selected ";
        selected = $option.text();
        initValue = $option.val();
      }
  
      if ($option.prop('disabled')){
        classes += "disabled ";
      }
  
      $values.append("<div class='" + classes + "' data-value='" + $option.val() + "'><span>" + $option.text() + "</span></div>");
    });
  }

  if (initValue){
    $(this).append("<div class='selected-value'><span>"+selected+"</span></div>");
    $(this).addClass('filled');
  } else {
    $(this).append("<div class='selected-value no-val'><span>"+selected+"</span></div>");
  }

  // append menu items to dropdown container
  $(this).append($values);
});


// clicking on the dropdown opens the menu
$(".styled-dropdown").on('click', function(e){

  var $container = $(this);
  // special handling for selection style dropdown, ignore the dropdown properties when in
  // selection grid mode while in desktop view
  if ($(this).hasClass('selection') && $(window).width() < 900 || (!$(this).hasClass('selection'))){
    e.preventDefault();
    if ($container.hasClass("active")){
      // close selected
      $container.removeClass('active');
      $container.find(".values").slideUp(300);
      $container.blur();
    } else {
      $(".styled-dropdown").removeClass('active');
      $(".styled-dropdown").find(".values").slideUp(300);
      $container.addClass('active');
      $container.find(".values").slideDown(300);
    }
  } else {
    // update the dropdown in mobile just to be consistent with displayed value
    $container.find(".value").removeClass('selected'); // unselect current selected
    $container.find("[data-value='" + $container.find(":checked").val() + "']").addClass('selected'); // updated the selected status
    $container.find(".selected-value").text($container.find(".value.selected").text()); // update the displayed selected
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
$(".styled-dropdown:not(.multi-select):not(.selection) .values .value").on('click', function(){

  var $option = $(this);

  if ($option.hasClass('disabled')){
    return false;
  }

  var $container = $option.closest(".styled-dropdown");
  // update displayed text
  $container.find(".selected-value").removeClass('no-val').text($option.text());

  // update selected value for the select element
  $container.find("select").val($option.data('value'));
  $container.find("select").trigger('change');
  // update the selected 
  $container.find(".value.selected").removeClass('selected');
  
  $option.addClass('selected');

  // close current selected
  $container.removeClass('active');
  $container.find('.values').slideUp(300);

  if ($option.data('value')){
    $container.addClass('filled');
  } else {
    $container.removeClass('filled');
  }

  $container.blur();

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
    $container.find(".selected-value").removeClass('no-val').text($container.find(".value.selected").text());
  } else {
    $container.find(".selected-value").removeClass('no-val').text($container.find(".value.selected").length + " selected");
  }

  $container.find("input").trigger('change');
  if ($container.find("input:checked").length > 0){
    $container.addClass('filled');
  } else {
    $container.removeClass('filled');
  }

  return false;
});


$(".styled-dropdown.selection .values .value").on('click', function(e){

  if ($(window).width() < 900){
    var $option = $(this);
    var $container = $option.closest(".styled-dropdown");

    // unselect all currently selected
    $container.find('.selected').removeClass('selected');
    $container.find('input[type="checkbox"]').prop('checked', false);
    $option.addClass('selected');

    // update the input with the matching value
    $container.find("input[value='" + $option.data('value') + "']").prop('checked', $option.hasClass('selected'));

    // update displayed text
    $container.find(".selected-value").removeClass('no-val').text($container.find(".value.selected").text());

    $container.find("input").trigger('change');

    $container.blur();
    $container.removeClass('active');
    $container.find('.values').slideUp(300);

    return false;
  } else {
    return true;
  }
});

// disables the anchor tag when in desktop mode
$(".styled-dropdown.selection").on('click', function(e){
  if ($(window).width() >= 900){
    var el = $(e.target);
    if (el.attr('href') == "#") {
      return false;
    }
  }
});


  
