'use strict';

const request = require('postman-request');

require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=${process.env.FORECAST_API_KEY}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find the location. Try another search.', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}°C out. It feels like ${body.current.feelslike}°C. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
