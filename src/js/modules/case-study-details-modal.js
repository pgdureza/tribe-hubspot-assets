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

var currentIndex = 0;
function initModalNextPrev(){

  // get current index
  $("[data-hash]").each(function(index){
    if ($(this).data('hash') == window.location.hash){
      currentIndex = index;
    }
  });

  var previous = $($("[data-hash]")[currentIndex - 1]);
  if(previous.length > 0){
    $(".popup-modal-container .prev-case").addClass('enabled');
  }

  var next = $($("[data-hash]")[currentIndex + 1]);
  if(next.length > 0){
    $(".popup-modal-container .next-case").addClass('enabled');
  }

}

function initDetailsModal(data){
  $(".popup-modal-container").html($(data).filter("main"));
  $(".popup-modal-container").modal({
    fadeDuration: 200,
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

      // show next/previous buttons
      initModalNextPrev();
      // assures fade in will always take place /fix for bug with multiple fading in modals
      $(".popup-modal-container.modal").fadeIn(200);
    }
  }, 50);
}

$(document).on('click', 'a[href^="/casestudies#/casestudy/"]', function(e){
  e.preventDefault();
  location.hash = ($(this).attr('href').split('#')[1]);
});

initSocialSharing();

function handleHashChanged(){
  if (window.location.hash.indexOf('/casestudy/') >= 0){
    var request_url = window.location.hash.replace("#","") + "?region=" + resources.country.region + "&currency=" + resources.country.currency_symbol + "&ajax=true";
    $.get(request_url, function(data){
      initDetailsModal(data); 
    });
  }
}

$(window).on('hashchange', function(e){
  handleHashChanged();
});

handleHashChanged();

$(document)
  .on('click', 'a.close-modal', function(e){
    removeHash();
  })
  .on('click', 'a.next-case', function(e){
    e.preventDefault();
    var next = $($("[data-hash]")[currentIndex + 1]);
    if(next.length > 0){
        next.trigger('click')
    }
  })
  .on('click', 'a.prev-case', function(e){
    e.preventDefault();
    var previous = $($("[data-hash]")[currentIndex - 1]);
    if(previous.length > 0){
      previous.trigger('click')
    }
  })

