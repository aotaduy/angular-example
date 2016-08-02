(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('DetailNamedPageController', DetailNamedPageController);

    DetailNamedPageController.$inject = [
        '$stateParams',
        'moviesConnector'
    ];

    /* @ngInject */
    function DetailNamedPageController($stateParams, moviesConnector){
        var vm = this;
        vm.movie = $stateParams.movie;
    }
})();
