"use strict";

const axios = require("axios");
let cache = require("./cache.js");

function getWeatherFun(req, res) {
  let searchQuery = req.query.city;
  let reqUrlw = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_API_KEY}`;

  if (cache[searchQuery] !== undefined) {
    console.log("the cashe contain data ");
    console.log(cache);
    res.send(cache[searchQuery]);
  } else {
    console.log("cache memory is empty hit the api");

    console.log(reqUrlw);
    console.log(req.query);
    axios
      .get(reqUrlw)
      .then((weatherinfo) => {
        console.log(weatherinfo);
        console.log(weatherinfo.data);

        let Array = weatherinfo.data.data.map((info) => {
          return new Forcast(info.weather.description, info.datetime);
        });

        cache[searchQuery] = Array;
        res.send(Array);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  // console.log("l", locResult);
  // console.log("seclocResult", weather.data);

  class Forcast {
    constructor(description, date) {
      this.description = description;
      this.date = date;
    }
  }
}

module.exports = getWeatherFun;
