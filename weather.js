require("dotenv").config();
const request = require("request");

const { darkSkyKey } = process.env;

var getWeather = (lat, lng) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        console.log("Unable to connect to forcast.io server");
      } else if (response.statusCode === 400) {
        console.log("Unable to fetch weather");
      } else if (response.statusCode === 200) {
        console.log("It's actually: " + body.currently.temperature);
        console.log("It feels like: " + body.currently.apparentTemperature);
      }
    }
  );
};

module.exports.getWeather = getWeather;
