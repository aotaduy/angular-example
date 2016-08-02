(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('MoviePageEditController', MoviePageEditController);

    MoviePageEditController.$inject = [
        'movie',
        'moviesConnector'
    ];

    /* @ngInject */
    function MoviePageEditController(movie, topMovies, moviesConnector){
        var vm = this;
        vm.movie = movie; // inherited
        vm.removeSimilar = removeSimilar;

        function removeSimilar(similarId) {
          vm.movie.similar.results.splice(similarId,1);
        }
    }
})();
