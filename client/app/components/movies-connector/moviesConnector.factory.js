(function() {
    'use strict';
    angular
        .module('movies.connector')
        .factory('moviesConnector', moviesConnectorFactory);

    /**
     * @ngInject
     */
    moviesConnectorFactory.$inject = [
        '$q',
        '$http',
        'moviesConnectorCache'
    ];

    function moviesConnectorFactory(
        $q,
        $http,
        moviesConnectorCache
    ) {
        var service = {
            cachedConfiguration: null,
            topRatedMovies: topRatedMovies,
            configuration: configuration,
            search: search,
            movieInfo: movieInfo,
            topRatedMoviesCompleteInfo: topRatedMoviesCompleteInfo
        };

        function topRatedMovies() {
            return $http.get('/api/movies/');
        }

        function topRatedMoviesCompleteInfo(){
            topRatedMovies()
                .then(function(response){
                    angular.forEach(response.results, function(obj){
                        movieInfo(obj.id)
                            .then(function(response){
                                console.log(response)
                            });
                    });
                });


        }

        function movieInfo(movieId) {
            var result = {};
            var deferred = $q.defer();

            var cacheResult = moviesConnectorCache.getCacheInfo(movieId);
            if (cacheResult.hasCache === true){ //the query has been catched:
                result.data = cacheResult.data.result;
                deferred.resolve(result);
            } else { //that query has NOT been catched:
                $http.get('/api/movies/info/' + movieId)
                    .then(function(response){
                        result.data = response.data;
                        moviesConnectorCache.addCacheInfo(movieId, result.data);
                        deferred.resolve(result);
                    });
            }

            return deferred.promise;
        }

        function search(query) {
            var result = {};
            var deferred = $q.defer();

            var cacheResult = moviesConnectorCache.getCacheSearch(query);
            if (cacheResult.hasCache === true){ //the query has been catched:
                result.data = cacheResult.data.result;
                deferred.resolve(result);
            } else { //that query has NOT been catched:
                $http.get('/api/movies/search/' + query)
                    .then(function(response){
                        result.data = response.data;
                        moviesConnectorCache.addCacheSearch(query, result.data);
                        deferred.resolve(result);
                    });
            }

            return deferred.promise;
        }

        function configuration() {
            if (service.cachedConfiguration) {
                return $q.when(service.cachedConfiguration);
            }
            return $http.get('/api/movies/configuration').then(function(response) {
                service.cachedConfiguration = response;
                return response;
            });
        }

        return service;

    }

})();
