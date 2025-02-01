'use strict';
const request = require('postman-request');

const customEncode = str =>
  str.replace(
    /[^a-zA-Z0-9\-._~]/g,
    match => `%${match.charCodeAt(0).toString(16).toUpperCase()}`
  );

const geocode = (address, callback) => {
  const url = `https://api.positionstack.com/v1/forward?access_key=740faa11608ba3b05591cbef0cb7f8ab&query=${customEncode(
    address
  )}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (!body.data || body.data.length === 0) {
      callback('Unable to find the location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: `${body.data[0].name}, ${body.data[0].region}, ${body.data[0].country}`,
      });
    }
  });
};

module.exports = geocode;
