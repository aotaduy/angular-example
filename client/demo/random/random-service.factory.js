(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo', [])
        .factory('randomService', randomFactory);


    randomFactory.$inject = [
        '$http',
        '$q'
    ];

    function randomFactory($http, $q) {
        var service =  {
            values: [],
            getRandom: getRandom,
            getLocal: getLocal,
            mean: mean

        };

        return service;

        function getRandom(){
            return $http.get('/api/random/faulty')
                .then(function (response) {
                    service.values.push(response.data.value);
                    return response.data.value.toFixed(3);
                }, function (response) {
                    response.data.value = response.data.value.toFixed(3);
                    return $q.reject(response);
                });
        }

        function getLocal(){
            return $q.when({value: Math.random()});
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
