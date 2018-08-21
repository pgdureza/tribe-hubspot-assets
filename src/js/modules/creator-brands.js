// check number of children
var totalBrands = $("#hs_cos_wrapper_creator-brands-gallery div").length;

function switchBrand(){
  var visibleBrands = $("#hs_cos_wrapper_creator-brands-gallery > div:visible").length;
  var hiddenBrands = totalBrands - visibleBrands;

  // random index and element to be replaced with currently invisible brand
  var randomIndex = Math.floor(Math.random() * visibleBrands);
  var $toBeHidden = $($("#hs_cos_wrapper_creator-brands-gallery div")[randomIndex]).html();

  // random hidden brand
  var randomHiddenIndex = Math.floor(Math.random() * hiddenBrands) + visibleBrands;
  var $toBeDisplayed = $($("#hs_cos_wrapper_creator-brands-gallery div")[randomHiddenIndex]).html();

  // switch brand array contents
  var $el = $($("#hs_cos_wrapper_creator-brands-gallery div")[randomIndex]);
  $el.addClass('hidden')
  var $elHidden = $($("#hs_cos_wrapper_creator-brands-gallery div")[randomHiddenIndex]);
  setTimeout(function(){ 
    $elHidden.html($toBeHidden);
    $el.html($toBeDisplayed);
    $el.removeClass('hidden')
  }, 800);
}

setInterval(function(){
  switchBrand()
}, 3000)