(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo')
        .factory('randomService', randomFactory);


    randomFactory.$inject = [
        '$http',
        '$q',
        '$timeout',
        '$cacheFactory'
    ];

    function randomFactory($http, $q, $timeout, $cacheFactory) {
        var service =  {
            values: [],
            sendData: sendData


        };

        return service;

        function sendData(){
            return $http.post('http://localhost:8002', {test: 'data', from: 1 , angular: 'friend'})
        }


    }

})();
