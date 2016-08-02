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
            .state('masterNamed.detailSimple', {
                url: 'detail/',
                views: {
                  list: {
                    controller: 'MasterNamedPageController',
                    controllerAs: 'masterVm',
                    templateUrl: 'app/pages/master-named/simple-list.html',
                  },
                  detail: {
                    controller: 'DetailNamedPageController',
                    controllerAs: 'detailVm',
                    templateUrl: 'app/pages/master-named/detail-simple.html',
                  }
                },
                params: {
                  movie: {}
                }
            });

    }
})();
