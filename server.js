"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
// const weather = require("./data/weather.json");
const getMovieFun = require('./module/movies.js');
const getWeatherFun= require('./module/weather.js');


server.get("/", (req, res) => {
  res.status(200).send("home route");
});
server.get("/test", (request, response) => {
  response.send("api server is working");
});

server.get("/weather",  getWeatherFun)
server.get("/movie",  getMovieFun)

server.get("*", (req, res) => {
  res.status(404).send("route is not found");
});

server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});
