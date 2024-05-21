var express = require("express");
var router = express.Router();
const request = require("request");
const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

const proxyUrl = "http://192.168.1.2:3128";

// Request options with proxy
const options = {
  url: nowPlayingUrl,
  proxy: proxyUrl,
};
/* GET home page. */
router.get("/", function (req, res, next) {
  request.get(options, (error, response, movieData) => {
    console.log(movieData);
  });
});

module.exports = router;
