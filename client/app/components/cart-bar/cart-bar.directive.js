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

    cartBarController.$inject=['cartFactory', '$rootScope', '$timeout'];

    function cartBarController(cartFactory, $rootScope, $timeout) {
        var vm = this;
        vm.quantity = 0;
        vm.list = {};
        vm.add = add;
        vm.remove = remove;
        vm.tooltipDel = false;
        vm.tooltipAdd = false;
        $rootScope.$on('changeCart', generateList);

        function generateList(event, type) {

            cartFactory.list().then(function(response) {
                vm.list = response;
                vm.quantity = cartFactory.length();
            });
            if (type === 'add') {
                vm.tooltipAdd = true;
                $timeout(function(){
                    vm.tooltipAdd = false;
                },1000);
            }

            if (type === 'remove') {
                vm.tooltipDel = true;
                $timeout(function(){
                    vm.tooltipDel = false;
                },1000)
            }
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
