(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('HomePageController', HomePageController);

    HomePageController.$inject = [
        '$window', 
        'movies',
        'configuration',       
        'moviesConnector',

    ];

    /* @ngInject */
    function HomePageController($window, movies, configuration, moviesConnector){
        var vm = this;
        vm.goToSearch = goToSearch;
        vm.search = search;
        vm.configuration = configuration.data;
        vm.movies = movies.data.results;
        vm.lastSearches = moviesConnector.lastSearches;
        vm.similarMovies=[];

        for(var i=0;i<vm.movies.length;i++){
            search(vm.movies[i].id);   
        }

        function goToSearch(query) {
            $window.location = '/search/' + query;
        }  

        function search(id){
            moviesConnector.movieInfo(id)
                                        .success(function (response) {
                                            vm.similarMovies.push(response);
                                        });}  
    }
})();
