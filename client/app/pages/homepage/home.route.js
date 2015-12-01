(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteHome);

        configRouteHome.$inject = [
            '$stateProvider'
        ];

        function configRouteHome ($stateProvider) {

        $stateProvider
          .state('home', {
                    url: '/',
                    title: 'Movies Home Page',
                    templateUrl: 'app/pages/homepage/home.html',
                    controller: 'HomePageController',
                    controllerAs: 'homeVm',
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
