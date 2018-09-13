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

    // special rule to change related to random filtered card

    // check if the filter form has any values
    var formValues = $('.desktop-only form').serializeArray();
    var selectedValues = "";
    for (var i in formValues){
      if (formValues[i].name == "category" || formValues[i].name == "region" || formValues[i].name == "budget"){
        selectedValues+= formValues[i].value;
      }
    }

    if (!!selectedValues){
      // get random cards
      var randomIndexes = [];
      do {
        var randomIndex = Math.floor(Math.random() * $(".case-card[data-case-id]").length);
        if (randomIndexes.indexOf(randomIndex) < 0){
          randomIndexes.push(randomIndex);
        }
        // case card less 2 because it is possible that we will send itself as a related case
      } while (randomIndexes.length < 4 && randomIndexes.length < (($(".case-card[data-case-id]").length - 2)));


      var randomCards = [];
      var selectedCard = $("[data-hash='" + window.location.hash + "']");
      for (var i in randomIndexes){
        var id = $(".case-card[data-case-id]").eq(randomIndexes[i]).data('case-id');
        if (id && id != selectedCard.data('case-id')){
          randomCards.push(id);
        }
      }
      if (randomCards.length > 0) {
        if (randomCards.length > 3) {
          randomCards = randomCards.slice(0,3);
        }
        request_url += "&relatedcases=" + randomCards.toString();
      }
    }

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

