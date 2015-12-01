(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteListing);

        configRouteListing.$inject = [
            '$stateProvider'
        ];

        function configRouteListing ($stateProvider) {

        $stateProvider
          .state('search-page', {
                    url: '/search/:query',
                    title: 'Search Movies',
                    templateUrl: 'app/pages/search/search-page.html',
                    controller: 'SearchPageController',
                    controllerAs: 'searchVm',
                    resolve: {
                        movies: ['$stateParams', 'moviesConnector', function($stateParams, moviesConnector) {
                            if($stateParams.query) {
                                return moviesConnector.search($stateParams.query)
                                        .then(function (response) {
                                            return response.data.results;
                                        });
                            } else {
                                return [];
                            }
                        }
                        ],
                        topMovies: ['moviesConnector', function( moviesConnector) {
                            return moviesConnector.topRatedMovies();
                        }
                        ],                        
                    }
                });
        }
})();
