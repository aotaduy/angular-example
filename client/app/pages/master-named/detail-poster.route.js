(function() {
    'use strict';

    angular
        .module('moviesApp')
        .config(configRouteDetail);

    configRouteDetail.$inject = [
        '$stateProvider'
    ];

    function configRouteDetail($stateProvider) {

        $stateProvider
            .state('masterNamed.detailPoster', {
                url: 'detail-poster/',
                views: {
                  list: {
                    controller: 'MasterNamedPageController',
                    controllerAs: 'masterVm',
                    templateUrl: 'app/pages/master-named/poster-list.html',
                  },
                  detail: {
                    controller: 'DetailNamedPageController',
                    controllerAs: 'detailVm',
                    templateUrl: 'app/pages/master-named/detail.html',
                  }
                },
                params: {
                  movie: {}
                }
            });

    }
})();
