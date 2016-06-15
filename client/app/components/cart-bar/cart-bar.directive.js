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

        $rootScope.$on('changeCart', function() {
            cartFactory.list().then(function(response) {
                 vm.list = response;
                 vm.quantity = cartFactory.length();
                 console.log("list aca");
            });
        });

    }
})();
