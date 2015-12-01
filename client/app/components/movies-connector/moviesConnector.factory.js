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
    ];

    function moviesConnectorFactory(
        $q,
        $http
    ) {
        var service = {
            cachedConfiguration: null,
            cachedSearches: [],
            topRatedMovies: topRatedMovies,
            configuration: configuration,
            search: search,
            movieInfo: movieInfo,
            review: review,
        };

        service.lastSearches = [];               

        function topRatedMovies() {
            return $http.get('/api/movies/');
        }
        function movieInfo(movieId) {            
            return $http.get('/api/movies/info/' + movieId)
                .success(function (response){
                    if(service.lastSearches.length<100){
                        service.lastSearches.push(
                            {
                                id: service.lastSearches.length+1, 
                                text: movieId, 
                                type:'info',
                                result: response.title
                            });
                    }
                    else{
                        service.lastSearches = 
                        [{
                            id: service.lastSearches.length+1, 
                            text: movieId , 
                            type:'info',
                            result: response.title
                        }];
                    }

                });
        }
        function search(query) {            
            return $http.get('/api/movies/search/' + query) 
            .success(function (response){
                    if(query!=''){
                        if(service.lastSearches.length<100){
                            service.lastSearches.push(
                                {
                                    id: service.lastSearches.length+1, 
                                    text: query, 
                                    type:'search',
                                    result: ''
                                });
                        }
                        else{
                            service.lastSearches = 
                            [{
                                id: service.lastSearches.length+1, 
                                text: query , 
                                type:'search',
                                result: ''
                            }];
                        }
                    }

            });
        }

        function review(json) {            
            return $http.post('/api/movies/reviews/' + json) 
             .then(function (response) {
                    return response.statusText;
                }, function (response) {
                    return $q.reject(response);
                });
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
