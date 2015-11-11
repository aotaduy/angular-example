/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash'),
    MovieDB = require('moviedb')(process.env.MOVIEDB_API);

// Get list of things
exports.get = get;
exports.index = index;
exports.search = search;
exports.configuration = configuration;
exports.nowPlaying = nowPlaying;

function configuration(req, res){
    MovieDB.configuration(function(err, movies){
        console.log(err);
        console.log(movies);
        if (movies === null) {
            res.json({
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    "logo_sizes": [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    "profile_sizes": [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    "still_sizes": [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  },
  "change_keys": [
    "adult",
    "also_known_as",
    "alternative_titles",
    "biography",
    "birthday",
    "budget",
    "cast",
    "character_names",
    "crew",
    "deathday",
    "general",
    "genres",
    "homepage",
    "images",
    "imdb_id",
    "name",
    "original_title",
    "overview",
    "plot_keywords",
    "production_companies",
    "production_countries",
    "releases",
    "revenue",
    "runtime",
    "spoken_languages",
    "status",
    "tagline",
    "title",
    "trailers",
    "translations"
  ]
})
        }
        res.json(movies);
    });
}

function get(req, res) {
    MovieDB.movieInfo({id: req.params.movieId}, function(err, response){
        MovieDB.movieSimilar({id: req.params.movieId}, function (errSimilar, responseSimilar) {
          response.similar = responseSimilar;
          res.json(response);
        })
        
    });
}

function search(req, res) {
    MovieDB.searchMovie({query: req.params.query}, function(err, response){
        res.json(response);
    });
}
function nowPlaying(req, res) {
    MovieDB.miscPopularMovies(function(err, movies){
        res.json(movies);
    });

}
function index(req, res) {

    MovieDB.miscTopRatedMovies(function(err, movies){
        res.json(movies);
    });

}
