(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('MoviePageController', MoviePageController);

    MoviePageController.$inject = [
        'movie',
        'moviesConnector'
    ];

    /* @ngInject */
    function MoviePageController(movie, topMovies, moviesConnector){
        var vm = this;
        vm.movie = movie;


    }
})();
