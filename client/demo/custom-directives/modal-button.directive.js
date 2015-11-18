(function() {
    'use strict';

    angular
        .module('custom-directives')
        .directive('modalButton', modalButtonDirective);
        

    function modalButtonDirective() {
        return {
            restrict: 'E',
            templateUrl: '/demo/custom-directives/modal-button.html',
            controller: 'ModalButtonController',
            controllerAs: 'modalVm',
            bindToController: true,
            transclude: true,
            scope: {
                title: '=',
                buttonText: '@',
                onCancel: '&'
                }
        };
    }
})();
