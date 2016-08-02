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
        '$http'
    ];

    function moviesConnectorFactory(
        $q,
        $http
    ) {
        var service = {
            cachedConfiguration: null,
            topRatedMovies: topRatedMovies,
            configuration: configuration,
            search: search,
            movieInfo: movieInfo,
            nowPlaying: nowPlaying

        };

        function topRatedMovies() {
            return $http.get('/api/movies/');
        }
        function nowPlaying() {
            return $http.get('/api/movies/playing/');
        }
        function movieInfo(movieId) {
            return $http.get('/api/movies/info/' + movieId);
        }
        function search(query) {
            return $http.get('/api/movies/search/' + query);
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
