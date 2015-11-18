(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteMovieSimilar);

        configRouteListing.$inject = [
            '$stateProvider'
        ];

        function configRouteMovieSimilar($stateProvider) {

        $stateProvider
          .state('movie-page.similar', {
                    url:'',
                    templateUrl: 'app/pages/movie/movie-page.similar.html',
                });
        }
})();
