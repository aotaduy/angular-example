(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteMovieReview);

        configRouteMovieReview.$inject = [
            '$stateProvider'
        ];

        function configRouteMovieReview($stateProvider) {

        $stateProvider
          .state('movie-page.review', {
                    url:'/review',
                    templateUrl: 'app/pages/movie/movie-page.review.html',
                });
        }
})();
