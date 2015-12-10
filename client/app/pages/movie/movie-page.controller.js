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

        vm.msg = null;

        vm.addReview = function(isValid){

            vm.submitted = true;

            if (isValid) {

                var data = {};
                data.user = vm.user;
                data.movieId = vm.movie.id;
                data.rating = vm.review.rate;
                data.comment = vm.review.comment;

                console.debug(data);

                moviesConnector.reviewAdd(data)
                    .then(function () {
                        vm.msg = 'Your review has been saved successfully';
                        console.debug('success');
                    })
                    .catch(function (response) {
                        vm.msg = 'There was an error submiting your review';
                        console.debug('error');
                    });
            }
        };

        vm.back = function(){
            vm.msg = null;
            vm.user = {};
            vm.review = {};
            vm.review = {};
        };

    }
})();
