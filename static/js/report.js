// TODO: refactor GPS long or lon to lng

const app = {}

/**
 * Converts GPS DMS to decimal
 * Credit: https://awik.io/extract-gps-location-exif-data-photos-using-javascript/
 * @param degrees Degrees angle
 * @param minutes Minutes angle
 * @param seconds Seconds angle
 * @param direction The direction (N,S,E,W)
 * @return {number} A GPS decimal
 */
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    let dd = degrees + (minutes/60) + (seconds/3600);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
    return parseFloat(dd.toFixed(6));
}

/**
 * Converts datetime from EXIF (yyyy:mm:dd hh:mm:ss) to ISO date (yyyy-mm-dd)
 * @param exifDate A datetime from EXIF metadata
 * @return {string} A date string
 */
function ConvertEXIFDateToISO(exifDate) {
    let fDate = exifDate.substr(0,10)
    return fDate.replace(new RegExp(':', 'g'), "-")
}

/**
 * Checks if an object has all properties (used to check GPS EXIF)
 * Credit: https://stackoverflow.com/a/48653724
 * @param obj The object to check
 * @param props An array of properties to check
 * @returns {boolean} True if all are present
 */
function hasAllProperties(obj, props) {
    for (var i = 0; i < props.length; i++) {
        if (!obj.hasOwnProperty(props[i]))
            return false;
    }
    return true;
}

/**
 * Returns GPS decimals given EXIF Data
 * @param exifData EXIF Data
 * @returns {{lon: null, error: boolean, lat: null, errormsg: null}} Object with lat/lon or an error
 */
function getGPSFromEXIF(exifData) {
    let rtn = {lat: null, lon: null, error: false, errormsg: null}
    try {
        let latDegree = exifData.GPSLatitude[0].numerator/exifData.GPSLatitude[0].denominator;
        let latMinute = exifData.GPSLatitude[1].numerator/exifData.GPSLatitude[1].denominator;
        let latSecond = exifData.GPSLatitude[2].numerator/exifData.GPSLatitude[2].denominator;
        let latDirection = exifData.GPSLatitudeRef;

        let longDegree = exifData.GPSLongitude[0].numerator/exifData.GPSLongitude[0].denominator;
        let longMinute = exifData.GPSLongitude[1].numerator/exifData.GPSLongitude[1].denominator;
        let longSecond = exifData.GPSLongitude[2].numerator/exifData.GPSLongitude[2].denominator;
        let longDirection = exifData.GPSLongitudeRef;

        rtn.lat = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
        rtn.lon = ConvertDMSToDD(longDegree, longMinute, longSecond, longDirection);
    } catch(error) {
        rtn.error = true;
        rtn.errormsg = error;
    }
    return rtn;
}

function getFormData() {
    let data = new FormData();
    data.append('date_obs', app.view.form.date.val());
    data.append('loc_lat', app.view.form.lat.val());
    data.append('loc_lng', app.view.form.lon.val());
    data.append('description', app.view.form.description.val());
    data.append('email', app.view.form.email.val());
    data.append('contact', app.view.form.contact.is(':checked'));
    data.append('image', app.view.form.photo[0].files[0]);
    data.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val());
    return data;
}

$(document).ready(function() {
    app.view = {
        form: {
            container: $('#reportForm'),
            photo: $('#form-photo'),
            date: $('#form-date'),
            lon: $('#form-lon'),
            lat: $('#form-lat'),
            description: $('#form-description'),
            email: $('#form-email'),
            contact: $('#form-agree'),
            loc_search: $('#form-location'),
            loc_search_container: $('#location-search'),
            submit: $('#form-submit'),
            enableFields: function() {$('.no-photo-disable').prop('disabled', false)},
            disableFields: function() {$('.no-photo-disable').prop('disabled', true)},
            clearFields: function() {
                app.view.form.date.val('');
                app.view.form.lat.val('');
                app.view.form.lon.val('');
            }
        }
    };

    app.view.form.date.datepicker({
        dateFormat: "yy-mm-dd"
    });

    app.view.form.loc_autocomplete = new google.maps.places.Autocomplete(app.view.form.loc_search[0], {
        types: ['geocode'],
        componentRestrictions: {country: 'au'}
    });

    google.maps.event.addListener(app.view.form.loc_autocomplete, 'place_changed', function() {
        if (!app.view.form.loc_search_container.hasClass('d-none')) {
            let place = app.view.form.loc_autocomplete.getPlace();
            app.view.form.lat.val(place.geometry.location.lat());
            app.view.form.lon.val(place.geometry.location.lng());
        }
    });

    if (app.view.form.photo.get(0).files.length === 0) {
        app.view.form.disableFields()
    }

    app.view.form.photo.on('change', function(e) {
        if (app.view.form.photo.get(0).files.length === 0) {
            app.view.form.disableFields();
            app.view.form.clearFields();
            app.view.form.loc_search_container.addClass('d-none');
        } else {
            let file = e.target.files[0];
            app.view.form.loc_search_container.addClass('d-none');
            app.view.form.clearFields();
            app.view.form.enableFields();
            EXIF.getData(file, function() {
                let data = this.exifdata;
                // Check if it has Date/Time
                if (data.hasOwnProperty('DateTime')) {
                    app.view.form.date.val(ConvertEXIFDateToISO(data.DateTime))
                }
                if (hasAllProperties(data, ['GPSLatitude','GPSLatitudeRef','GPSLongitude','GPSLongitudeRef'])) {
                    let gps = getGPSFromEXIF(data)
                    if (!gps.error) {
                        app.view.form.lat.val(gps.lat);
                        app.view.form.lon.val(gps.lon);
                    } else {
                        app.view.form.loc_search_container.removeClass('d-none');
                    }
                } else {
                    app.view.form.loc_search_container.removeClass('d-none');
                }
            });
        }
    })

    app.view.form.container.on('submit', function(e) {
        e.preventDefault();
        let data = getFormData();
        for (var key of data.keys()) {
            console.log("[DEBUG] " + key + ": " + data.get(key));
        }
        $.ajax({
            type: "post",
            url: $('meta[name=api-endpoint]').attr('content'),
            processData: false,
            data: data,
            contentType: false,
            beforeSend: function(req) {
                req.setRequestHeader('csrfmiddlewaretoken', data.get('csrfmiddlewaretoken'));
                app.view.form.submit.prop('disabled', true);
                app.view.form.photo.prop('disabled', true);
                app.view.form.disableFields();
                app.view.form.submit.find('span').removeClass('d-none');
                app.view.form.submit.text('Uploading');
            },
            success: function(res) {
                app.view.form.submit.find('span').addClass('d-none');
                app.view.form.submit.text('Success');
                window.location.replace(res.redirect);
            },
            error: function(res) {
                console.error(res);
                app.view.form.submit.prop('disabled', false);
                app.view.form.photo.prop('disabled', false);
                app.view.form.enableFields();
                app.view.form.submit.find('span').addClass('d-none');
                app.view.form.submit.text('Submit');
            }
        });
        return false;
    })
});