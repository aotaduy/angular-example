(function() {
    'use strict';
    angular
        .module('movies.connector')
        .factory('moviesConnectorCache', moviesConnectorCacheFactory);

    /**
     * @ngInject
     */
    moviesConnectorCacheFactory.$inject = [
        'cache_calls'
    ];

    function moviesConnectorCacheFactory(
        cache_calls
    ) {
        var service = {
            catchedInfo: [],
            catchedSearch : [],
            getCacheInfo: getCacheInfo,
            addCacheInfo: addCacheInfo,
            getCacheSearch: getCacheSearch,
            addCacheSearch: addCacheSearch
        };

        function getCacheInfo(movieId) {
            var result = {};
            result.hasCache = false;
            result.data = {};
            angular.forEach(service.catchedInfo, function(obj){
                if (movieId == obj.movieId){
                    result.hasCache = true;
                    result.data = obj;
                    console.log('cache INFO found!');
                }
            });
            return result;
        }

        function addCacheInfo(movieId, result){
            if (service.catchedInfo.length > cache_calls.INFO_MOVIES){
                console.log('Cleaning INFO cache');
                service.catchedInfo = [];
            }
            service.catchedInfo.push({ movieId: movieId, result: result});
        }

        function getCacheSearch(query) {
            var result = {};
            result.hasCache = false;
            result.data = {};
            angular.forEach(service.catchedSearch, function(obj){
               if (query == obj.query){
                   result.hasCache = true;
                   result.data = obj;
                   console.log('cache MOVIES found!');
               }
            });
            return result;
        }

        function addCacheSearch(query, result){
            if (service.catchedSearch.length > cache_calls.SEARCH_MOVIES){
                console.log('Cleaning MOVIES cache');
                service.catchedSearch = [];
            }
            service.catchedSearch.push({ query: query, result: result});
        }

        return service;
    }

})();
