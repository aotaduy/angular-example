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
function createRouteConfigs(app) {
  var routeConfigs = {};
  routeConfigs.get = get;
  routeConfigs.index = index;
  routeConfigs.search = search;
  routeConfigs.configuration = configuration;
  routeConfigs.nowPlaying = nowPlaying;
  routeConfigs.lastVisited = lastVisited;

    function configuration(req, res){
      app.db.findOne({configuration: 1}, function (err, result) {
          if (result) {
            res.json(result.configurationData);
          } else{
        MovieDB.configuration(function(err, config){
            app.db.insert({configuration: 1, configurationData: config});
            res.json(config);
        });
      }
    });
    }

    function get(req, res) {
        app.db.findOne({movieId: req.params.movieId}, function (err, result) {
          if (result) {
            res.json(result.movie)
          } else{
        MovieDB.movieInfo({id: req.params.movieId}, function(err, response){
            MovieDB.movieSimilar({id: req.params.movieId}, function (errSimilar, responseSimilar) {
              response.similar = responseSimilar;
              app.db.insert({movieId: req.params.movieId, movie: response});
              res.json(response);
            })
            
        });
      }
    });
    }

    function search(req, res) {
        app.db.findOne({searchQuery: req.params.query}, function (err, result) {
          if (result) {
            res.json(result.searchResults)
          } else{
            MovieDB.searchMovie({query: req.params.query}, function(err, response){
                app.db.insert({searchQuery: req.params.query, searchResults: response});
                res.json(response);
            });    
          }
        })
        
    }

    function nowPlaying(req, res) {
        MovieDB.miscPopularMovies(function(err, movies){
            res.json(movies);
        });

    }


    function lastVisited(req, res) {
        MovieDB.miscPopularMovies(function(err, movies){
            res.json(movies);
        });

    }

    function index(req, res) {
    app.db.findOne({topRated: 1}, function (err, result) {
          if (result) {
            res.json(result.movies);
          } else{
          MovieDB.miscTopRatedMovies(function(err, movies){
            app.db.insert({topRated: 1, movies: movies});
              res.json(movies);
          });
        }
      });
    }
    return routeConfigs;
}

module.exports = createRouteConfigs;