function getFilterParams(){
  var filterArray = $(".filters form").serializeArray()

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


var lastFormValues = $(".filters form").serialize();
$(".filters form").on('change', $.debounce(1000, function () {
  var newFormValues = $(".filters form").serialize();
  if (lastFormValues != newFormValues){
    lastFormValues = newFormValues;
    var ajaxURL = window.location.origin + window.location.pathname + getFilterParams();
    $.get(ajaxURL, function(data){
      $("#case-study-grid").html($(data).filter("main").find("#case-study-grid").html());
      fadeInImages();
    })
  }
}));

