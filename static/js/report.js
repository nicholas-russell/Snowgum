var app = {}

/**
 * @return {number}
 */
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + (minutes/60) + (seconds/3600);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
    return parseFloat(dd.toFixed(6));
}

$(document).ready(function() {
    $('#form-date').datepicker({
        dateFormat: "yy-mm-dd"
    });
    var input = document.getElementById("form-location")
    var options = {
        types: ['geocode'],
        componentRestrictions: {country: 'au'}
    };
    app.autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(app.autocomplete, 'place_changed', function() {
        var place = app.autocomplete.getPlace();
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
    });

    document.getElementById("form-photo").onchange = function(e) {
        var file = e.target.files[0]
        if (file && file.name) {
            EXIF.getData(file, function() {
                var data = this.exifdata;

                var latDegree = data.GPSLatitude[0].numerator/data.GPSLatitude[0].denominator;
                var latMinute = data.GPSLatitude[1].numerator/data.GPSLatitude[1].denominator;
                var latSecond = data.GPSLatitude[2].numerator/data.GPSLatitude[2].denominator;
                var latDirection = data.GPSLatitudeRef;
                
                var longDegree = data.GPSLongitude[0].numerator/data.GPSLongitude[0].denominator;
                var longMinute = data.GPSLongitude[1].numerator/data.GPSLongitude[1].denominator;
                var longSecond = data.GPSLongitude[2].numerator/data.GPSLongitude[2].denominator;
                var longDirection = data.GPSLongitudeRef;

                var lat = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
                var lon = ConvertDMSToDD(longDegree, longMinute, longSecond, longDirection);
                console.log(lat);
                console.log(lon);
            });
        }
    }
});