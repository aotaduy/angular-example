(function() {
    'use strict';

    // Create module and controller
    angular
        .module('custom-directives', [])
        .controller('ModalButtonController', ModalButtonController);


    ModalButtonController.$inject = [
        '$rootScope'
    ];

    function ModalButtonController($rootScope) {
        // Controller as viewModel
        var vm = this;
        // Initialization
        // Controller methods
        vm.modalClosed = modalClosed

     function modalClosed () {
         $rootScope.$emit('modalClosed');
         vm.onCancel();
     }
    }
})();
