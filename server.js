
'use strict';
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/', homeRouteHandler);
server.get('/movie', getMovieHandler);
server.get('/weather', getWeatherHandler);
server.get('*', notFoundHandler);

class Forecast{
  constructor(description , date){
    this.description =description
    this.date=date
  
  }
}
class Movie{
  constructor(title ,poster_path, popularity){
    this.title = title
    this.poster_path= 'https://image.tmdb.org/t/p/w500' + poster_path
    this.popularity = popularity
  

}
}

function homeRouteHandler(req, res) {
  res.send('home route')
}
function getWeatherHandler(req, res){
let searchQuery= req.query.city;
// let weatherURL = `https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2021-09-21&end_date=2021-09-22&key=${process.env.WEATHER_API_KEY}&city=${searchQuery}`;
let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_API_KEY}`;

console.log(req.query);
console.log(weatherURL)

axios.get(weatherURL).then(weatherInfo => {
  console.log(weatherInfo)
  console.log(weatherInfo.data)
let array =  weatherInfo.data.data.map(item =>{ 
return new Forecast(item.weather.description,item.datetime)

})
res.send(array)
}).catch(error => { res.send(error)
});
}
function getMovieHandler(req, res){

  let searchQuery= req.query.searchQuery;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  console.log(req.query);
  console.log(movieURL)

  axios.get(movieURL).then(movieResult => {
    console.log(movieResult)
    console.log(movieResult.results)
  let Array =  movieResult.data.results.map(item =>{ 
  return new Movie(item.title,item.poster_path, item.popularity)
  
  })
  res.send(Array)
  }).catch(error => { res.send(error)
  });
  }

server.get("*", (req, res) => {
  res.status(404).send("route is not found");
});

function notFoundHandler(req, res) {
  res.status(404).send('route is not found')
}


server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});
