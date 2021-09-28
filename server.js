
'use strict';
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());

// const weather = require("./data/weather.json");
const getMovieFun = require('./module/movies.js');
const getWeatherFun= require('./module/weather.js');

server.get('/', homeRouteHandler);
server.get('/movie', getMovieHandler);
server.get('/weather', getWeatherHandler);
server.get('*', notFoundHandler);


server.get("*", (req, res) => {
  res.status(404).send("route is not found");
});

function notFoundHandler(req, res) {
  res.status(404).send('route is not found')
}


server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});
