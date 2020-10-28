const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a014821cc123fe108447e850d67bec6e&query="+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({ url, json: true}, (error, {body} = {} ) => {
        if (error){
            callback('Unable to connect to the internet', undefined);
        } else if (body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. ' + body.current.temperature + ' °C, feels like ' + body.current.feelslike + ' °C');
        }
    });
}

module.exports = forecast;