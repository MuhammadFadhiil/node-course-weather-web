const request = require('postman-request');

/* =======
create reusable function 
mapbox geocode => search longlat
========== */

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVoZmFkaGlpbCIsImEiOiJja211MWxlYXkwaWR6Mm9wZDJ6dGN3NWxvIn0.QzoYWdemQubXfyR22dT_Tg&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect the API", undefined);
        } else if (response.body.features.length === 0) {
            callback("No matching result, search another location", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;