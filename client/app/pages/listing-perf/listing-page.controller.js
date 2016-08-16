(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('ListingPagePerfController', ListingPageController);

    ListingPageController.$inject = [
        'movies',
        'configuration',
        'moviesConnector'
    ];

    /* @ngInject */
    function ListingPageController(movies, configuration){
        var vm = this;
        vm.configuration = configuration.data;
        vm.reloadList = reloadList;
        vm.visible = true;
        vm.onOff = onOff;
        vm.centerTitle = centerTitle;
        vm.totalVotes = totalVotes;
        reloadList();

          function reloadList() {
            vm.movies = getMovies();
          }
        
        function totalVotes() {
          console.log('calculando votos');
          return vm.movies.reduce(function (pValue, each) {
            return pValue + each.vote_count;
          }, 0)
        }

        function centerTitle(movie) {
          return movie.popularity > 6;
        }
        function onOff() {
          vm.visible = !vm.visible;
        }

        function getMovies() {
          var answer = [], movie;
          for (var i = 0 ; i < 700; i++) {
            movie = angular.copy(movies.data.results[Math.floor(Math.random() * movies.data.results.length)]);
            movie.identifier = i;
            answer.push(movie);
          }
          return answer;

        }
    }
})();
