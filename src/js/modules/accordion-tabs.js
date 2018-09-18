// initialize the animated indicator for mobile
$(".tabs-wrapper").each(function(){
  var el = $(this);
  var numberOfTabs = el.find(" > span > div").length;
  el.find(".indicator").css("width", (100/numberOfTabs)+"%");
});

// handler for clicking on tabs
$(".accordion-tab").on('click', function(e){
	e.preventDefault();
	$(".accordion-tab").removeClass('active');
  $(this).addClass('active');
  
  // update indicator position
  var indicatorPositionMultiplier = $(this).parent().index();
  var transformValue = (indicatorPositionMultiplier * 100) + "%";
  $(this).closest(".tabs-wrapper").find(".indicator")
    .css("-webkit-transform", "translate("+transformValue+")")
    .css("-ms-transform", "translate("+transformValue+")")
    .css("transform", "translate("+transformValue+")");

  $(".tab-content:not(" + target + ")").hide();

  var target = $(this).attr('href');
  $(target).fadeIn(500);

});

// handler for opening a faq accordion and closing existing ones
$(".accordion-content .header").on('click', function(e){
  e.preventDefault();
  // close open content 
  if ($(this).hasClass('active')){
    $(this).removeClass('active');
    $(this).next().slideUp();
  } else {
    $(".accordion-content").find('.active + .content').slideUp();
    $(".accordion-content .active").removeClass('active');
  
    // open the new content
    $(this).next().slideDown();
  
    // toggle the active class
    $(this).addClass('active');
  }
});