(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('MoviePageController', MoviePageController);

    MoviePageController.$inject = [
        'movie',
        'configuration',
        'moviesConnector',
    ];

    /* @ngInject */
    function MoviePageController(movie,configuration,moviesConnector){
        var vm = this;
        vm.movie = movie;
        vm.configuration = configuration.data;
        vm.submit = submit;
        vm.changeRating = changeRating;
        vm.submitted = false;
        vm.message = null;
        vm.movieRating=0;
        vm.movieReview;
        vm.success = false;

        function submit(rating, comment, name, lastName, email ) {
           vm.movieReview=[{user: 
                                { 
                                    name: name,
                                    lastname: lastName,
                                    email: email
                                },
                            movieId: vm.movie.id,
                            rating: rating,
                            comment: comment 
                            }
                        ];
            moviesConnector.review(vm.movieReview)
                .then(function() {
                    vm.message = 'Your Review was successfully saved.';
                    vm.movieRating = 0;
                    vm.comment = '';
                    vm.name = '';
                    vm.lastName = '';
                    vm.email = '';
                    vm.submitted=false;
                    vm.success = true;
                })
                .catch(handleError);      
        }

        function handleError(aResponse) {
            vm.message = 'Your Review could not be saved. Failed with: ' + aResponse.status 
            + ' ' + aResponse.data.value;
            vm.submitted=false;
            vm.success = false;
        }

        function changeRating(text) {
           vm.movieRating=text;        
        }

        

    }
})();
