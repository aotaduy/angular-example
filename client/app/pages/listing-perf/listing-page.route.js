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
          .state('listing-perf', {
                    url: '/list-perf/',
                    title: 'Search Movies',
                    templateUrl: 'app/pages/listing-perf/listing-page.html',
                    controller: 'ListingPagePerfController',
                    controllerAs: 'listingVm',
                    resolve: {
                        movies: ['$stateParams', 'moviesConnector', function($stateParams, moviesConnector) {
                        return moviesConnector.topRatedMovies();
                        }
                        ],
                        configuration: ['moviesConnector', function(moviesConnector) {
                          return moviesConnector.configuration();
                        }
                        ]
                    }
                });
        }
})();
