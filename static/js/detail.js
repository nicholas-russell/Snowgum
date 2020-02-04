var map;

function initMap() {
    let loc = {lat: parseFloat($('#detail-map').attr('data-lat')), lng: parseFloat($('#detail-map').attr('data-lng'))}
    map = new google.maps.Map(document.getElementById('detail-map'), {
        center: loc,
        zoom: 8
    });
    let marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Observation {{ data.id }}'
    });
}

$(document).ready(function() {

});
