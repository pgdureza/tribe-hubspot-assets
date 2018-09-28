function getCurrentOpenCaseStudyLinkIndex(){
  var currentDetailsCaseId = $("[data-details-case-id]").data('details-case-id');
  var linkIndex = 0;
  $("[data-cs-modal-navigatable]").each(function(index){
    if ($(this).data('case-id') == currentDetailsCaseId){
      linkIndex = index
    }
  })
  return linkIndex;
}

function initModalNextPrev(){

  var caseLinkIndex = getCurrentOpenCaseStudyLinkIndex();

  var total_navigatable = $("[data-cs-modal-navigatable]").length;
  if (caseLinkIndex > 0){
    $(".popup-modal-container .prev-case").addClass('enabled');
  }
  if (caseLinkIndex < total_navigatable - 1){
    $(".popup-modal-container .next-case").addClass('enabled');
  }

}

function initDetailsModal(data){
  if (data){
    $(".popup-modal-container").html($(data).filter('main'));
  }
  $(".popup-modal-container").modal({
    fadeDuration: 200,
    showClose: true,
    clickClose: false,
    escapeClose: false
  });

  // using setInterval since .modal does not have a callback handler
  var hasModalClass = setInterval(function(){
    if ($(".popup-modal-container").parent().hasClass('jquery-modal')){
      clearInterval(hasModalClass);
      initSlick();
      initScrollHandler();

      // show next/previous buttons
      initModalNextPrev();
      // assures fade in will always take place /fix for bug with multiple fading in modals
      $(".popup-modal-container.modal").fadeIn(200);

      utilFunctions.formatNumber();
      utilFunctions.formatDataCurrency();
      utilFunctions.fadeInImages();
    }
  }, 50);
}

$(document).on('click', '[data-cs-modal]', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  window.history.pushState({href: href}, $(this).data('title'), href);
  requestCaseStudyDetails($(this).data('case-path'));
});

initSocialSharing();

function requestCaseStudyDetails(path){
  var request_url = window.location.origin + '/case-study/' + path + "?details=true";
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
      var randomIndex = Math.floor(Math.random() * $("#case-study-grid .case-card[data-case-id]").length);
      if (randomIndexes.indexOf(randomIndex) < 0){
        randomIndexes.push(randomIndex);
      }
      // case card less 2 because it is possible that we will send itself as a related case
    } while (randomIndexes.length < 4 && randomIndexes.length <= ($("#case-study-grid .case-card[data-case-id]").length - 1));


    var randomCards = [];
    var selectedCard = $("[data-hash='" + window.location.hash + "']");
    for (var i in randomIndexes){
      var id = $("#case-study-grid .case-card[data-case-id]").eq(randomIndexes[i]).data('case-id');
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
  
  // create a loading clode for modal
  var loadingModalConfig = {
    fadeDuration: 200,
    showClose: false,
    clickClose: false,
    escapeClose: false
  }
  if ($(".loading.modal").length <= 0){
    var loadingClone = $(".loading").clone().addClass('modal')
    loadingClone.modal(loadingModalConfig)
  } else {
    $(".loading.modal").modal(loadingModalConfig)
  }

  $.get(request_url, function(data){
    initDetailsModal(data); 
  });
}

$(document)
  .on('click', 'a.close-modal', function(e){
    window.history.pushState({href: window.resources.origin}, '', window.resources.origin);
  })
  .on('click', 'a.next-case', $.throttle(1000, function(e){
    e.preventDefault();
    $("[data-cs-modal-navigatable]").eq(getCurrentOpenCaseStudyLinkIndex() + 1).trigger('click')
    return false;
  }))
  .on('click', 'a.prev-case', $.throttle(1000, function(e){
    e.preventDefault();
    $("[data-cs-modal-navigatable]").eq(getCurrentOpenCaseStudyLinkIndex() - 1).trigger('click')
    return false;
  }))

