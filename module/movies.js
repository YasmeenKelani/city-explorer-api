"use strict";

const axios = require("axios");
let cache = require("./cache.js");
function getMovieFun(req, res) {
  let searchQuery = req.query.searchQuery;

  let reqUrlmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  if (cache[searchQuery] !== undefined) {
    console.log("the cashe contain data ");
    console.log(cache);
    res.send(cache[searchQuery]);
  } else {
    console.log("cache memory is empty hit the api");

    console.log(reqUrlmovie);
    console.log(req.query);
    axios
      .get(reqUrlmovie)
      .then((movieInfo) => {
        console.log(movieInfo);
        console.log(movieInfo.results);

        let Arraym= movieInfo.data.results.map((info) => {
          return new Movie(info.title, info.poster_path, info.popularity);
        });

        cache[searchQuery] = Arraym;
        res.send(Arraym);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  // console.log("l", locResult);
  // console.log("seclocResult", weather.data);

  class Movie {
    constructor(title, poster_path, popularity) {
      this.title = title;
      this.poster_path = "https://image.tmdb.org/t/p/w500" + poster_path;

      this.popularity = popularity;
    }
  }
}
module.exports = getMovieFun;
