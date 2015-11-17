(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteMovieEdit);

        configRouteMovieEdit.$inject = [
            '$stateProvider'
        ];

        function configRouteMovieEdit($stateProvider) {

        $stateProvider
          .state('movie-page.edit', {
                    url: '/edit',
                    templateUrl: 'app/pages/movie/movie-page.edit.html',
                });
        }
})();
