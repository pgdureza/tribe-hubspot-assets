if ($("#brands-main-section").length > 0){

  $(document).ready(function(){

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

  });

}