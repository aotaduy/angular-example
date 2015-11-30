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
    function MoviePageController(movie, moviesConnector){
        var vm = this;
        vm.movie = movie;
        vm.user = {};
        vm.review = {};

        vm.addReview = function(){
            var data = {};
            data.user = vm.user;
            data.movieId = vm.movie.id;
            data.rating = vm.review.rate;
            data.comment = vm.review.comment;

            console.debug(data);

            moviesConnector.reviewAdd(data)
                .then(function(){
                    console.debug('success');
                })
                .catch(function(response){
                    console.debug('error');
                });

        }

    }
})();
