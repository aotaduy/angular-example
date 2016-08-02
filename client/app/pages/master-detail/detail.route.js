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
            .state('master.detail', {
                url: 'detail/',
                templateUrl: 'app/pages/master-detail/detail.html',
                controller: 'DetailPageController',
                controllerAs: 'detailVm',
                params: {
                  movie: {}
                }
            });

    }
})();
