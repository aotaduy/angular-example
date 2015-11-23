(function() {
    'use strict';

    angular
        .module('customValidation')
        .directive('emailCom', emailComDirective);
        
        emailComDirective.$inject = [];

    function emailComDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: emailComLink
        };

        function emailComLink(scope, element, attributes, ngModelController) {
            var oldEmail;
            oldEmail = ngModelController.$validators.email;

            ngModelController.$validators.email = validateEmail;

            scope.modelController = ngModelController;
            
            function validateEmail(viewValue, modelValue) {

                return modelValue === undefined || oldEmail(viewValue, modelValue) && modelValue.endsWith('.com');
            }
        }
    }
})();
