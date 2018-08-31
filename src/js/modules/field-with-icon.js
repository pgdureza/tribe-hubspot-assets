$(".field-with-icon input").on('focus', function(){
  $(this).parent().addClass('active');
}).on('blur', function(){
  $(this).parent().removeClass('active');
})

