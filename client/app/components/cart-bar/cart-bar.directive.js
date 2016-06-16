(function() {
    'use strict';

    angular
    .module('moviesApp')
    .directive('cartBar', cartBarDirective)
    .controller('cartBarController', cartBarController);

    function cartBarDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/cart-bar/cart-bar.html',
            controller: cartBarController,
            controllerAs: 'cartBarVm',
            bindToController:true,
            scope: {
            }
        };
    }

    cartBarController.$inject=['cartFactory', '$rootScope'];

    function cartBarController(cartFactory, $rootScope) {
        var vm = this;
        vm.quantity = 0;
        vm.list = {};
        vm.add = add;
        vm.remove = remove;

        $rootScope.$on('changeCart', generateList);

        function generateList() {
            cartFactory.list().then(function(response) {
                 vm.list = response;
                 vm.quantity = cartFactory.length();
            });
        }
        function add(key) {
            cartFactory.plus(key).then(function(){
                generateList()
            });
        }
        function remove(key) {
            cartFactory.minus(key).then(function(){
                generateList();
            });
        }
    }
})();
