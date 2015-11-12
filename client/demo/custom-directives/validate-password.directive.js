(function() {
    'use strict';

    angular
        .module('custom-directives', [])
        .directive('validatePassword', validatePasswordDirective);
        
        validatePasswordDirective.$inject = ['$parse'];

    function validatePasswordDirective($parse) {
        return {
            restrict: 'A',
            link: linkValidatePassword
        };

        function linkValidatePassword(scope, element, attributes) {
            var message,
                showMessage = $parse(attributes.showMessage)(scope) || false ;
            scope.$watch(function () {
                return element.val();
            }, doValidation);
            message = angular.element('<span class="text-danger">Min Size Failed</span>');
            if (showMessage){
               element.after(message);
            }
            message.hide();
            function doValidation(newValue) {
                if (newValue.length > attributes.minLength && newValue.length < attributes.maxLength ) {
                    element.addClass('min-size');
                    message.show();
                } else {
                    element.removeClass('min-size');
                    message.hide();
                }
            }
        }
    }
})();
