const request = require('postman-request');

/* =======
create reusable function 
weatherstack => forecast
========== */

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4c8f6c8d3fc8a8a016e7fb3ca66fe8a4&query=' + latitude + ',' + longitude + '&units=f';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect the API", undefined);
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + ' degress out');
        }
    });
}

module.exports = forecast;