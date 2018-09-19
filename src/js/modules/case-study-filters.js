// mobile filter functions
$(".filters .mobile-only #all_cat").on('click', function(e){
  $(".filters .mobile-only [name='category']").prop('checked', false)
  $(this).prop('checked', true);
});

// category behaviour for "all categories"
$(".filters .mobile-only [name='category']").on('change', function(){
	if ($(".mobile-only [name='category']:checked").length == 0){
		$(".filters .mobile-only #all_cat").prop('checked', true)
	} else {
		$(".filters .mobile-only #all_cat").prop('checked', false)
	}
});

// budget "radio" behaviour
$('.mobile-only [name="budget"]').on('click',function(){
	$(this).parent().siblings(".checkbox").find('input').prop('checked', false)
});

$('.mobile-only form').on('submit', function(e){
  e.preventDefault();
  $('.mobile-only .controls').trigger('click'); // trigger click to close filter on submit
  // uncheck everything selected
  $(".desktop-only form [data-value='']").click()
  // update the fields in desktop
  function triggerClickOnDesktopForm(name, value){
    $(".desktop-only form [name='" + name + "']").closest('.styled-dropdown').find("[data-value='" + value + "']").click();
  }
  var formValues = $(".mobile-only form").serializeArray();
  for (var i in formValues){
    triggerClickOnDesktopForm(formValues[i].name, formValues[i].value);
  }
});

// mobile hide/show filters
$('.mobile-only .controls').on('click', function(e){
  $(this).toggleClass('active');
  $(this).siblings('form').toggleClass('active');
});

// $('.mobile-only form').on('reset', function(e){ // reset with the default country selected
//   setTimeout(function(){
//     $('.mobile-only [name="region"][value="' + resources.country.region + '"]').prop('checked', true)
//   }, 0)
// });

/******** DESKTOP FILTER FUNCTIONS ********/
function getFilterParams(){
  var filterArray;
  if ($(window).innerWidth() < 980){
    filterArray = $(".filters .mobile-only form").serializeArray()
  } else {
    filterArray = $(".filters .desktop-only form").serializeArray()
  }

  // convert array to reduced map
  var filterMap = {};
  var size = 0;
  $(filterArray).each(function(index, object){
    if (filterMap[object.name]){
      filterMap[object.name] = filterMap[object.name] + "," + object.value;
    } else if (!!object.value){
      filterMap[object.name] = object.value;
      size++;
    }
  })

  // convert map to string params
  var filterParams = "?";
  var index = 0;
  for (var key in filterMap){
    filterParams += key + "=" + filterMap[key];
    index++;
    if (index < size){
      filterParams += "&"
    }
  }
  return filterParams;
}

window.lastFormValues = {};
function loadContent(){
  $("[name='offset']").val("");
  var newFormValues = $(".filters .desktop-only form").serialize();
  if (lastFormValues != newFormValues){
    $("#case-study-grid .loading").addClass('show');
    $("#case-study-grid .grid-content").hide();
    lastFormValues = newFormValues;
    var ajaxURL = window.resources.origin + getFilterParams();
    $.get(ajaxURL, function(data){
      $("#case-study-grid").html($(data).filter("main").find("#case-study-grid").html());
      utilFunctions.fadeInImages();
    });
  }
}

$(".filters .desktop-only form").on('change', $.debounce(500, function () {
  loadContent();
}));

$(document).on("click", ".show-more", function(e){
  $(this).remove();
  $("#case-study-grid .loading").addClass('show');
  e.preventDefault();
  $("[name='offset']").val($("#case-study-grid .case-card").length);
  var ajaxURL = window.location.origin + window.location.pathname  + getFilterParams();
  $.get(ajaxURL, function(data){
    $("#case-study-grid .loading").remove();
    $("#case-study-grid").append($(data).filter("main").find("#case-study-grid").html());
    utilFunctions.fadeInImages();
  })
});

$(document).ready(function(){
  loadContent();
})
