// shuffle brands()
$(".brand-gallery").each(function(index, el) {
  var $el = $(el);
  var $find = $el.children();

  $find.sort(function() {
      return 0.5 - Math.random();
  });

  $el.empty();
  $find.appendTo($el);
});

// generate random hide-show swapping of images
var $brands = $(".brand-gallery .image-wrapper");
var totalBrands = $brands.length;

function switchBrand(){
  var visibleBrands = $brands.find(":visible").length;
  var hiddenBrands = totalBrands - visibleBrands;

  // random index and element to be replaced with currently invisible brand
  var randomIndex = Math.floor(Math.random() * visibleBrands);
  var $toBeHidden = $($brands[randomIndex]).html();

  // random hidden brand
  var randomHiddenIndex = Math.floor(Math.random() * hiddenBrands) + visibleBrands;
  var $toBeDisplayed = $($brands[randomHiddenIndex]).html();

  // switch brand array contents
  var $el = $($brands[randomIndex]);
  $el.addClass('hidden')
  var $elHidden = $($brands[randomHiddenIndex]);
  setTimeout(function(){ 
    $elHidden.html($toBeHidden);
    $el.html($toBeDisplayed);
    $el.removeClass('hidden');
  }, 800);
}

setInterval(function(){
  switchBrand()
}, 3000)