(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo')
        .controller('RandomController', RandomController);


    RandomController.$inject = [
        'randomService'
    ];

    function RandomController(randomService) {
        // Controller as viewModel
        var vm = this;
        // Initialization
        vm.randomNumber = 0;
        vm.arraySize = 5;
        vm.message = null;
        vm.messageHistory = '';
        vm.numbers = randomService.values;

        // Controller methods
        vm.updateNextRandom = updateNextRandom;
        vm.updateNextRandomXml = updateNextRandomXml;
        vm.getRandomArray = getRandomArray;
        vm.getMean = randomService.mean;

        /* Get next random number */
        function updateNextRandom() {
            vm.message = 'Updating...';
            vm.randomNumber = 0;
            randomService.getRandom()
                .then(function(aValue) {
                    vm.status = 200;
                    vm.message = null;
                    vm.randomNumber = aValue;
                    vm.messageHistory = vm.messageHistory + aValue + '\n';
                })
                .catch(handleError);
        }

        function updateNextRandomXml() {
            vm.message = 'Updating...';
            vm.randomNumber = 0;
            randomService.getRandomXml()
                .then(function(aValue) {
                    vm.status = 200;
                    vm.message = null;
                    vm.randomNumber = aValue;
                    vm.messageHistory = vm.messageHistory + aValue + '\n';
                })
                .catch(handleError);
        }

        function handleError(aResponse) {
            vm.message = 'Failed with: ' + aResponse.status + ' ' + aResponse.data.value;
            vm.randomNumber = null;
            vm.messageHistory = vm.messageHistory + vm.message + '\n';
        }

        function getRandomArray(size) {
            vm.message = 'Updating...';
            randomService.getRandomArray(size).then(function (response) {
                vm.messageHistory = vm.messageHistory + 'Array: ' + response + '\n';
                vm.message = null;
            }, handleError);
        }

    }
})();
