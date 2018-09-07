function removeHash () {
  var scrollV, scrollH, loc = window.location;
  if ("pushState" in history)
    history.pushState("", document.title, loc.pathname + loc.search);
  else {
    // Prevent scrolling by storing the page's current scroll offset
    scrollV = document.body.scrollTop;
    scrollH = document.body.scrollLeft;

    loc.hash = "";

    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scrollV;
    document.body.scrollLeft = scrollH;
  }
}

function initDetailsModal(data){
  $(".popup-modal-container").html($(data).filter("main"));
  $(".popup-modal-container").modal({
    fadeDuration: 200,
    fadeDelay: 1,
    showClose: true,
    clickClose: false,
    escapeClose: false
  });

  // using setInterval since .modal does not have a callback handler
  var hasModalClass = setInterval(function(){
    if ($(".popup-modal-container").parent().hasClass('jquery-modal')){
      initSlick();
      initScrollHandler();
      clearInterval(hasModalClass);
    }
  }, 50);
}

$(document).on('click', 'a[href^="/casestudy/"]', function(e){
  // close any existing modal
  $("a.close-modal").length > 0 && $("a.close-modal").trigger('click');
  location.hash = ($(this).attr('href'));
  e.preventDefault();
});

initSocialSharing();

function handleHashChanged(){
  if (window.location.hash.indexOf('/casestudy/') >= 0){
    var request_url = window.location.hash.replace("#","") + "&region=" + resources.country.region + "&currency=" + resources.country.currency_symbol + "&ajax=true";
    $.get(request_url, function(data){
      initDetailsModal(data); 
    });
  }
}

$(window).on('hashchange', function(e){
  handleHashChanged();
});

handleHashChanged();

$(document).on('click', 'a.close-modal', function(e){
  removeHash();
});

