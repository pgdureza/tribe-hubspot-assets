//=include global/**/*.js

$(document).ready(function(){

  //=include modules/case-study-details.js
  //=include modules/case-study-details-modal.js
  //=include modules/styled-dropdown.js
  //=include modules/case-study-filters.js

  if (typeof isCaseDetails != "undefined" && isCaseDetails) {
    initDetailsModal();
  }

});