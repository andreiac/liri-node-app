require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");
var fs = require("fs");

var operator= process.argv[2];


if (operator!="concert-this"&& operator!="spotify-this-song"&& operator!="movie-this"&& operator!="do-what-it-says"){
    operator="do-what-it-says"
}

if (operator === "concert-this"){
   var artist=process.argv.slice(3).join(" ");

   request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, res) {

      if (!error && response.statusCode === 200) {
          console.log("-------------------------------------");
          console.log("Venue: " + JSON.parse(res)[0].venue.name);
          console.log("Location: " + JSON.parse(res)[0].venue.city + " " + JSON.parse(res)[0].venue.region);
          console.log("Date: " + moment(JSON.parse(res)[0].datetime).format("MM/DD/YYYY"));
          console.log("-------------------------------------");
      }
  });


    console.log("you are searching for a band called ", artist)
   } 
   
   else if (operator === "spotify-this-song") {
      var song=process.argv.slice(3).join(" ");

      if (song === undefined) {
          song = "The Sign";
      }
  
      spotify.search({
          type: "track",
          query: song
      }, function (err, data) {
          if (err) {
              return console.log("Error occured: " + err);
          }
          console.log("-------------------------------------");
          console.log("Artist: " + data.tracks.items[0].artists[0].name);
          console.log("Song Name: " + data.tracks.items[0].name);
          console.log("Preview Link: " + data.tracks.items[0].preview_url);
          console.log("Album: " + data.tracks.items[0].album.name);
          console.log("-------------------------------------");
      });
  
  
  } 
  else if (operator === "movie-this") {
  
   var movie=process.argv.slice(3).join(" ");
  
      if (movie === undefined) {
          movie = "Mr. Nores";
      }
  
      request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, res) {
  
          if (!error) {
  
              // Information about Movie
              console.log("-------------------------------------");
              console.log("Title: " + JSON.parse(res).Title);
              console.log("Year Released: " + JSON.parse(res).Year);
              console.log("IMDB Rating: " + JSON.parse(res).imdbRating);
              console.log("Rotten Tomatoes Rating: " + JSON.parse(res).Ratings[1].Value);
              console.log("Country Produced: " + JSON.parse(res).Country);
              console.log("Language: " + JSON.parse(res).Language);
              console.log("Plot: " + JSON.parse(res).Plot);
              console.log("Actors: " + JSON.parse(res).Actors);
              console.log("-------------------------------------");
          }
      });
  
  } else if (operator === "do-what-it-says") {
  
      fs.readFile("random.txt", "utf8", function (error, data) {
  
          if (error) {
              return console.log(error);
          }
  
          console.log(data);
          var dataArr = data.split(",");
          console.log(dataArr);
  
          operator = dataArr[0];
          whatTooperator = dataArr[1];
  
          if (operator === "concert-this") {
  
              var artist = whatTooperator;
  
              request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, res) {
  
                  if (!error && response.statusCode === 200) {
                      console.log("-------------------------------------");
                      console.log("Venue: " + JSON.parse(res)[0].venue.name);
                      console.log("Location: " + JSON.parse(res)[0].venue.city + " " + JSON.parse(res)[0].venue.region);
                      console.log("Date: " + moment(JSON.parse(res)[0].datetime).format("MM/DD/YYYY"));
                      console.log("-------------------------------------");
                  }
              });
  
  
              // IF WILDCARD want to know about a SONG
          } else if (operator === "spotify-this-song") {
              var song = whatTooperator;
  
              if (song === undefined) {
                  song = "The Sign";
              }
  
              spotify.search({
                  type: "track",
                  query: song
              }, function (err, data) {
                  if (err) {
                      return console.log("Error occured: " + err);
                  }
                  console.log(data.tracks.items[0].album[0]);
                  // console.log("-------------------------------------");
                  // console.log("operator: ", operator, ", Song Name: ", song);
                  // console.log("Artist: " + data);
                  // console.log("Song Name: " + data);
                  // console.log("Preview Link: " + data);
                  // console.log("Album: " + data);
                  // console.log("-------------------------------------");
              });
  
  
              // IF WILDCARD wants to know about a MOVIE
          } else if (operator === "movie-this") {
  
              var movie = whatTooperator;
  
              if (movie === undefined) {
                  movie = "Mr. Nobody";
              }
  
              request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, res) {
  
                  if (!error && response.statusCode === 200) {
  
                      // Information about Movie
                      console.log("-------------------------------------");
                      console.log("Title: " + JSON.parse(res).Title);
                      console.log("Year Released: " + JSON.parse(res).Year);
                      console.log("IMDB Rating: " + JSON.parse(res).imdbRating);
                      console.log("Rotten Tomatoes Rating: " + JSON.parse(res).Ratings[1].Value);
                      console.log("Country Produced: " + JSON.parse(res).Country);
                      console.log("Language: " + JSON.parse(res).Language);
                      console.log("Plot: " + JSON.parse(res).Plot);
                      console.log("Actors: " + JSON.parse(res).Actors);
                      console.log("-------------------------------------");
                  }
              });
  
  
              // IF operator not entered or incorrectly entered
          } else {
              console.log("operator Error");
          }
  
          console.log("-------------------------------------");
          console.log("operator: ", operator);
          console.log("-------------------------------------");
      });
  
  
      // IF operator not entered or incorrectly entered
  } else {
      console.log("operator Error");
  }