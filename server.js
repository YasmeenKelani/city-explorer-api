'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const weather = require('./data/weather.json')

server.get('/', (req, res) => {

  res.status(200).send('home route');
});
server.get('/test', (request, response) => {
  response.send('api server is working');
});

server.get('/weather', (req, res) => {

let searchQuery= req.query.searchQuery;
console.log(req.query);

let weatherInfo = weather.find((item)=>{
  if(item.city_name === searchQuery){
    
    return item
    
  }
})
console.log(weatherInfo)

let array = weatherInfo.data.map(item =>{ 
return new Forecast(item.weather.description, item.datetime)

})
res.send(array)
})

class Forecast{
  constructor(description , date){
    this.description =description
    this.date=date
  
  }
}


server.get('*',(req,res)=>{
  res.status(404).send('route is not found')
})



server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});