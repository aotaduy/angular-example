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
          .state('listing-page', {
                    url: '/list/:query',
                    title: 'Search Movies',
                    templateUrl: 'app/pages/listing/listing-page.html',
                    controller: 'ListingPageController',
                    controllerAs: 'listingVm',
                    resolve: {
                        movies: ['$stateParams', 'moviesConnector', function($stateParams, moviesConnector) {
                        return moviesConnector.topRatedMovies();
                        }
                        ],
                        configuration: ['moviesConnector', function(moviesConnector) {
                        return moviesConnector.configuration();
                        }
                        ],                        
                    }
                });
        }
})();
