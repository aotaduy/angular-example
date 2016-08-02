(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteMovieDebug);

        configRouteMovieDebug.$inject = [
            '$stateProvider'
        ];

        function configRouteMovieDebug($stateProvider) {

        $stateProvider
          .state('movie-page.debug', {
                    url: '/debug',
                    templateUrl: 'app/pages/movie/movie-page.debug.html',
                    controller: 'MoviePageController',
                    controllerAs: 'movieVm',
                });
        }
})();
