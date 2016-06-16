(function() {
    'use strict';

    angular
    .module('moviesApp')
    .directive('addToCart', addToCartDirective)
    .controller('addToCartController', addToCartController);

    function addToCartDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/add-to-cart/add-to-cart.html',
            controller: addToCartController,
            controllerAs: 'addToCartVm',
            bindToController:true,
            scope: {
                movie: '='
            }
        };
    }

    addToCartController.$inject=['cartFactory'];

    function addToCartController(cartFactory) {
        var vm = this;
        vm.add = add;
        vm.remove = remove;
        vm.check = check;

        function add() {
            cartFactory.add(vm.movie);
        }

        function remove() {
            cartFactory.remove(vm.movie);
        }

        function check() {
            return cartFactory.check(vm.movie.id);
        }
    }
})();
