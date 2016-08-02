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
            .state('masterNamed', {
              title: 'Master',
                url: '/master-named/',
                templateUrl: 'app/pages/master-named/master.html',
                controller: 'MasterNamedPageController',
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
