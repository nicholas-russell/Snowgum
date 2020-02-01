
var options = {

};
var input = document.getElementById("form-location")

$(document).ready(function() {
    $('#form-date').datepicker({
        dateFormat: "yy-mm-dd"
    });
    var autocomplete = new google.maps.places.Autocomplete(input, options);
});