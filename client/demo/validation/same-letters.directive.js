(function() {
    'use strict';

    angular
        .module('customValidation')
        .directive('sameLettersNumbers', sameLettersNumbersDirective);
        
        sameLettersNumbersDirective.$inject = [];

    function sameLettersNumbersDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: sameLettersNumbersLink
        };

        function sameLettersNumbersLink(scope, element, attributes, ngModelController) {

            ngModelController.$validators.sameLettersNumbers = validateSameNumbers;

            function validateSameNumbers(viewValue, modelValue) {
                var letters = (viewValue || ' ').match(/[A-Za-z]/g) || [],
                    numbers = (viewValue || ' ').match(/[0-9]/g) || [];

                return letters.length === numbers.length;
            }
        }
    }
})();
