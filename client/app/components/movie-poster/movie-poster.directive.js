(function() {
    'use strict';

    angular
        .module('moviesApp')
        .directive('moviePoster', moviePosterDirective);
    function moviePosterDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/movie-poster/movie-poster.html',
            scope: {
                movie: '=',
                type: '='
            }
        };
    }
})();
