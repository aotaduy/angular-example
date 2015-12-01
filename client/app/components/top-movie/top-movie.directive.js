(function() {
    'use strict';

    angular
        .module('moviesApp')
        .directive('topMovie', topMovieDirective);
    function topMovieDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/top-movie/top-movie.html',
            scope: {
                movie: '=',            
            },
        }            
        
    }
})();
