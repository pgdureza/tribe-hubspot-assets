
if ($("#creator-main-section").length > 0){

  function randomToggleFadingBrands(){
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
  }

  $(document).ready(function(){

    randomToggleFadingBrands();

    // slider for what-are-you-waiting-for
    $("#hs_cos_wrapper_featured-image-slider").slick({
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      prevArrow: false,
      nextArrow: false,
      autoplay: true,
      autoplaySpeed: 5000,
    });

    // generate brand slider control buttons
    var testimonials_controls = [];
    $("#hs_cos_wrapper_testimonial-slider .testimonial-slide").each(function(){
      var img_src = $(this).data('control-image');
      testimonials_controls.push($("<div>").append(img_src))
    });
    $("#testimonial-slider-control").html(testimonials_controls);

    // create the slick connection for testimonials
    $('#hs_cos_wrapper_testimonial-slider').slick({
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      infinite: false,
      prevArrow: false,
      nextArrow: false,
      draggable: false,
      asNavFor: '#testimonial-slider-control'
    });

    $('#testimonial-slider-control').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      infinite: false,
      asNavFor: '#hs_cos_wrapper_testimonial-slider',
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      prevArrow: false,
      nextArrow: false,
    });

  });
}