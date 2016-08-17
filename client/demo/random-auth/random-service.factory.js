(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo2')
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
            mean: mean,
            getRandom: getRandom,
            getRandomXml: getRandomXml,
            getRandomDeferred: getRandomDeferred,
            getRandomArray: getRandomArray,
            getLocal: getLocal

        };

        return service;

        function getRandom(){
            return $http.get('/api/random/xml')
                .then(function (response) {
                    service.values.push(response.data.value);
                    return response.data.value.toFixed(3);
                }, function (response) {
                    response.data.value = response.data.value.toFixed(3);
                    return $q.reject(response);
                });
        }

        function getRandomXml(){
            return $http.get('/api/random/xml')
                .then(function (response) {
                    service.values.push(response.data.value);
                    return response.data.value.toFixed(3);
                }, function (response) {
                    response.data.value = response.data.value.toFixed(3);
                    return $q.reject(response);
                });
        }
        /* Answer an array with <size> number of random numbers
        calls.push($http.get('/api/random/slow?' + i, {cache: false ).then(function (response) {

        */
        function getRandomArray(size){
            var calls = [];
            for (var i = 0; i < size; i++){
                calls.push($http.get('/api/random/slow?' + i , {timeout: 200}).then(function (response) {
                    return response.data.value.toFixed(3);
                }));
            }
            return $q.all(calls);
        }

        function getLocal(){
            return $q.when({value: Math.random()});
        }

        function getRandomDeferred(){
            var deferred = $q.defer();
            $timeout(function () {
                var number = Math.random().toFixed(3);
                if (number < 0.5){
                    deferred.reject({
                        status: 404,
                        data: {value: number }
                    });
                } else {
                    deferred.resolve(number);
                }
            }, Math.random() * 2000);
            return deferred.promise;
        }

        function mean(){
            var sum = 0;
            service.values.forEach( function(each) {
                sum = sum + each;
            });
            return sum / service.values.length;
        }
    }

})();
