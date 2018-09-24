// animated counter
$('.animated-counter .counter').each(function () {
  var $el = $(this);
  var counterValue = $el.data('value').toString().replace(/,/g, '');
  $el.html("<div class='displayed-value'>");

  if (typeof $el.attr('data-currency') != 'undefined'){
    $el.before("<div class='prefix'>" + resources.country.currency_symbol) + "</div>";
  }

  if (typeof $el.attr('data-shorten') != 'undefined'){
    var valWithCommas = Math.ceil(parseInt(counterValue)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var segments = valWithCommas.split(',');
    if (segments.length == 2){
      suffix = "k"
    } else if (segments.length == 3){
      suffix = "M"
    } else if (segments.length == 4){
      suffix = "B"
    }
    // shorten starting point
    counterValue = segments[0];
    if (suffix){
      $el.after("<div class='suffix'>"+suffix+"</div>");
    }
  }

  var od = new Odometer({
    el: $el.find('.displayed-value')[0],
    value: counterValue - 50,
    format: '(,ddd)',
    theme: 'default'
  });
  
  $el.appear(function(){
    od.update(counterValue);
  }); 

}); 