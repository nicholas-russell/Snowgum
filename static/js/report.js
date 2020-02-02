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

$(document).ready(function() {
    app.view = {
        form: {
            photo: $('#form-photo'),
            date: $('#form-date'),
            lon: $('#form-lon'),
            lat: $('#form-lat'),
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

    if (app.view.form.photo.get(0).files.length === 0) {
        app.view.form.disableFields()
    }

    app.view.form.photo.on('change', function(e) {
        if (app.view.form.photo.get(0).files.length === 0) {
            app.view.form.disableFields();
            app.view.form.clearFields()
        } else {
            let file = e.target.files[0];
            app.view.form.clearFields()
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
                    }
                }
            });
        }
    })
});