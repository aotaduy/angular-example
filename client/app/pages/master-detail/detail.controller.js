(function() {
    'use strict';

    angular
        .module('moviesApp')
        .controller('DetailPageController', DetailPageController);

    DetailPageController.$inject = [
        '$stateParams',
        'moviesConnector'
    ];

    /* @ngInject */
    function DetailPageController($stateParams, moviesConnector){
        var vm = this;
        vm.movie = $stateParams.movie;
    }
})();
