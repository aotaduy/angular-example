(function() {
    'use strict';
    angular
    .module('moviesApp')
    .factory('cartFactory', cartFactory);

    /**
    * @ngInject
    */
    cartFactory.$inject = [
        '$q',
        '$http'
    ];

    function cartFactory(
        $q,
        $http
    ) {
        var service = {
            add: add,
            remove: remove,
            list: list,
            check: check,
            length: length
        };

        var data = {};

        function add(movie) {
            data[movie.id] = {
                quantity: 1,
                movie: movie
            };
            return $q.when(true);
        }

        function remove(movie) {
            return $q.when(delete data[movie.id]);
        }

        function list() {
            return $q.when(data);
        }

        function check(id) {
            return data[id];
        }

        function length() {
            var totalQuantity = 0;
            angular.forEach(data, function(value, key) {
                totalQuantity = totalQuantity + value.quantity;
            });
            return totalQuantity;
        }
        return service;

    }

})();
