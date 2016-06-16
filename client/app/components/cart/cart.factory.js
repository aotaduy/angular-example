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
        '$http',
        '$rootScope'
    ];

    function cartFactory(
        $q,
        $http,
        $rootScope
    ) {
        var service = {
            add: add,
            remove: remove,
            list: list,
            check: check,
            length: length,
            plus: plus,
            minus: minus
        };

        var data = {};
        function plus(key) {
            data[key].quantity = data[key].quantity + 1;
            return $q.when(true);
        }

        function minus(key) {
            var quantity = data[key].quantity - 1;
            if (quantity === 0) {
                console.log("aca", data[key]);
                remove(data[key].movie);
            } else {
                data[key].quantity = data[key].quantity - 1;
            }
            return $q.when(true);
        }
        function add(movie) {
            data[movie.id] = {
                quantity: 1,
                movie: movie
            };
            $rootScope.$emit('changeCart', 'add');
            return $q.when(true);
        }

        function remove(movie) {
            $rootScope.$emit('changeCart', 'remove');
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
