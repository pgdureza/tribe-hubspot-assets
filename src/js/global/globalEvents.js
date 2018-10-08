// load in all images 
var utilFunctions = {
  fadeInImages: function () {
    $(".fade-in-image img:not(.loaded)").on('load', function () {
      $(this).addClass('loaded')
    }).each(function () {
      if (this.complete) $(this).load();
    });
  },

  formatDataCurrency: function () {
    $("[data-currency]:not('.currency-initialized')").each(function () {
      var thisCurrency = $(this).data('currency');
      if (!!thisCurrency) {
        if (thisCurrency == resources.country.currency_code) {
          $(this).prepend(resources.country.currency_symbol);
        } else {
          $(this).hide();
        }
      } else {
        $(this).prepend(resources.country.currency_symbol);
        $(this).addClass('currency-initialized');
      }
    });
  },

  formatNumber: function () {
    $("[data-number-format]:not('.number-format-initialized')").each(function () {
      var el = $(this);
      var number = el.text().trim();
      el.attr('data-number-original-val', number);
      if (number && !isNaN(number)) {
        if (number.split(".").length > 1) { // if has decimal
          var whole = number.split(".")[0];
          var decimal = number.split(".")[1];
          number = Math.ceil(parseInt(whole)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimal;
        } else {
          number = Math.ceil(parseInt(number)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        if (typeof el.attr('data-shorten') != 'undefined') {
          var decimal = number.split(".")[1];
          var commaSeparated = number.split(",");
          var suffix = "";
          if (commaSeparated.length == 2) {
            suffix = "k"
          } else if (commaSeparated.length == 3) {
            suffix = "M"
          } else if (commaSeparated.length == 4) {
            suffix = "B"
          }

          number = commaSeparated[0] + suffix;
        }

        if (typeof el.attr('data-money') != 'undefined') {
          number = resources.country.currency_symbol + number;
        }

        el.text(number)
          .addClass('number-format-initialized');
      }
    });
  }
}


utilFunctions.fadeInImages();

$(document).ready(function () {

  // polyfill objectfit
  if (objectFitImages) {
    objectFitImages()
  }

  // burger menu
  $(".hamburger").click(function () {
    $("body").toggleClass("mobile-menu-open");
  });

  $(window).on('scroll', $.throttle(500, function () {
    var mainHeader = $(".main-header");
    var mobileHeader = $(".mobile-header ");
    if ($(".main-header").hasClass('has-shadow') && $(window).scrollTop() == 0) {
      mainHeader.removeClass('has-shadow');
      mobileHeader.removeClass('has-shadow');
    } else {
      mainHeader.addClass('has-shadow');
      mobileHeader.addClass('has-shadow');
    }
  }));

});

// create faux listener for when the newsletter form is loaded
var waitingForNewsletterForm = setInterval(function () {
  if ($("#hs_form_target_newsletter form").length >= 1) {
    clearInterval(waitingForNewsletterForm);
    var arrowImage = '<img src="https://www.tribegroup.co/hubfs/TRIBE-Website-2018-Assets/Global-Assets/Right-1.svg" alt="subscribe"/>';
    $(".newsletter-wrapper .hs_email .input").append('<button><span>SUBSCRIBE</span><span class="arrow-button"> ' + arrowImage + ' </span></button>');

    // add an on submit callback
    // hubspot doesn't allow callback in html form, so we convert it into html
    $("#hs_form_target_newsletter form").on('submit', function () {
      var formCallback = setInterval(function () {
        if ($("#hs_form_target_newsletter.submitted-message").length > 0) {
          clearInterval(formCallback);
          var responsePlaceholder = $("#hs_form_target_newsletter p");
          var content = responsePlaceholder.text();
          responsePlaceholder.html(content)
          responsePlaceholder.addClass('show');
          setTimeout(function () {
            responsePlaceholder.addClass('fadeIn');
          }, 0)
        }
      }, 100)
    });

    if ($('.newsletter-wrapper ul.inputs-list li').find("input[type='radio']").length > 0){
      $('.newsletter-wrapper ul.inputs-list li').each(function(){
  
        var $option = $(this).find("input[type='radio']").is(':checked');
  
        if($(this).attr('role') === 'radio') {
          if($option) {
            $(this).attr('aria-checked','true');
          } else {
            $(this).attr('aria-checked','false');
          }
        }
      });
    }

  }
}, 100);

//Accessibility: Adding aria tags.

setTimeout(function() {
  
}, 1000);

if ($('.main-footer .footer-menu ul').length > 0 && $('.main-header .header-menu ul').length > 0) {
	$('.main-footer .footer-menu ul li, .main-header .header-menu ul').find('a').each(function(){
		var $role = $(this).attr('role');
		if($role === 'menuitem') {
      $(this).parents('ul').attr('role','menu');
      $(this).parents('li').attr('role','none');
		}
  });
}