(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('MasterNamedPageController', MasterPageController);

    MasterPageController.$inject = [
        'movies',
        'moviesConnector'
    ];

    /* @ngInject */
    function MasterPageController(movies, moviesConnector){
        var vm = this;
        vm.movies = movies.data.results;

    }
})();
