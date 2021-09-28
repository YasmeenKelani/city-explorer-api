'use strict';

const axios = require("axios");

function getMovieFun (req, res){

    let searchQuery = req.query.searchQuery;

    let reqUrlmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY }&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
    
    console.log(reqUrlmovie);
    console.log(req.query)
     axios.get(reqUrlmovie).then(movieInfo=>{
    console.log(movieInfo) 
    console.log(movieInfo.results)                  
    
    let Array = movieInfo.data.results.map(info=>
    {return new Movie(info.title,info.poster_path, info.popularity)
    })

res.send(Array)
  }).catch(error => { res.send(error)
  });
  }

    // console.log("l", locResult);
    // console.log("seclocResult", weather.data);

    class Movie {
    constructor(title, poster_path,popularity){
    this.title=title
    this.poster_path= "https://image.tmdb.org/t/p/w500" + poster_path 

    this.popularity=popularity
}
}
    
 

module.exports=getMovieFun;