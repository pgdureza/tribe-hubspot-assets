
$("[name='country']").easyAutocomplete({
  url: "https://www.tribegroup.co/hubfs/TRIBE%20Website%202018%20Assets/Get%20in%20Touch/countries.json",
  getValue: "name",

  list: {	
    match: {
      enabled: true
    }
  }
});
$("[name='country']").attr('autocomplete','off-country')