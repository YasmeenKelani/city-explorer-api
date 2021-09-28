'use strict';

const axios = require("axios");

function getWeatherFun (req, res){

    let searchQuery = req.query.searchQuery;

    let reqUrlw = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_API_KEY}`;
    
    console.log(reqUrlw);
    console.log(req.query)
     axios.get(reqUrlw).then(weatherinfo=>{
    console.log(weatherinfo) 
    console.log(weatherinfo.data)                  
    
    let Array = weatherinfo.data.data.map(info=>
    {return new Forcast(info.weather.description, info.datetime)
    })

res.send(Array)
  }).catch(error => { res.send(error)
  });
  }

    // console.log("l", locResult);
    // console.log("seclocResult", weather.data);

    class Forcast {
    constructor(description, date){
    this.description = description
    this.date=date
}
}
    
 

module.exports=getWeatherFun;