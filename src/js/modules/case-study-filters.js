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
$('.mobile-only [name="budget"]').off().on('click',function(){
	$(this).parent().siblings(".checkbox").find('input').prop('checked', false)
});

$('.mobile-only form').on('submit', function(e){
  e.preventDefault();
  $("[name='offset']").val("");
  $("#case-study-grid .loading").addClass('show');
  $("#case-study-grid .grid-content").hide();
  var newFormValues = $(".filters .mobile-only form").serialize();
  var ajaxURL = window.location.origin + window.location.pathname + getFilterParams();
  $.get(ajaxURL, function(data){
    $("#case-study-grid").html($(data).filter("main").find("#case-study-grid").html());
    fadeInImages();
  })
});

$('.mobile-only form').on('reset', function(e){ // reset with the default country selected
  setTimeout(function(){
    $('.mobile-only [name="region"][value="' + resources.country.region + '"]').prop('checked', true)
  }, 0)
});




// desktop filter fnctions
function getFilterParams(){
  var filterArray;
  if ($(window).innerWidth() < 900){
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
// resets entire grid
var lastFormValues = {};
$(".filters .desktop-only form").on('change', $.debounce(500, function () {
  $("[name='offset']").val("");
  $("#case-study-grid .loading").addClass('show');
  $("#case-study-grid .grid-content").hide();
  var newFormValues = $(".filters .desktop-only form").serialize();
  if (lastFormValues != newFormValues){
    lastFormValues = newFormValues;
    var ajaxURL = window.location.origin + window.location.pathname + getFilterParams();
    $.get(ajaxURL, function(data){
      $("#case-study-grid").html($(data).filter("main").find("#case-study-grid").html());
      fadeInImages();
    })
  }
}));

$(document).on("click", ".show-more", function(e){
  $(this).remove();
  $("#case-study-grid .loading").addClass('show');
  e.preventDefault();
  $("[name='offset']").val($("#case-study-grid .case-card").length);
  var ajaxURL = window.location.origin + window.location.pathname + getFilterParams();
  $.get(ajaxURL, function(data){
    $("#case-study-grid .loading").remove();
    $("#case-study-grid").append($(data).filter("main").find("#case-study-grid").html());
    fadeInImages();
  })
});

// select default for mobile
$('.mobile-only [name="region"][value="' + resources.country.region + '"]').prop('checked', true)

// select default region
$('.desktop-only [name="region"]').siblings('.values')
  .find('[data-value="' + resources.country.region + '"]')
  .trigger('click');
