(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteMaster);

    configRouteMaster.$inject = [
        '$stateProvider'
    ];

    function configRouteMaster($stateProvider) {

        $stateProvider
            .state('master', {
              title: 'Master',
                url: '/master/',
                templateUrl: 'app/pages/master-detail/master.html',
                controller: 'MasterPageController',
                controllerAs: 'masterVm',
                resolve: {
                    movies: getMovies
                }
            });

        getMovies.$inject = ['$stateParams', 'moviesConnector'];

        function getMovies($stateParams, moviesConnector) {
            return moviesConnector.nowPlaying();
        }
    }
})();
