const request = require("request");
const weather = require("./weather");

const getAddress = address => {
  var encodedAddress = encodeURIComponent(address);

  //request (option, callback)
  request(
    {
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        console.log("Unable to connect to google Servers");
      } else if (body.status === "ZERO_RESULTS") {
        console.log("Address not found");
      } else if (body.status === "OK") {
        //   console.log(JSON.stringify(body, undefined, 2));
        console.log(`Address: ${body.results[0].formatted_address}`);
        // console.log(`latitude: ${body.results[0].geometry.location.lat}`);
        // console.log(`longitude: ${body.results[0].geometry.location.lng}`);
        weather.getWeather(
          body.results[0].geometry.location.lat,
          body.results[0].geometry.location.lng
        );
      }
    }
  );
};

module.exports.getAddress = getAddress;
