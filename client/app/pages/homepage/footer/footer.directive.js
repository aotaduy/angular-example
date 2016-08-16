(function() {
    'use strict';

    angular
        .module('moviesApp')
        .directive('homeFooter', homeFooterDirective);
    function homeFooterDirective() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/pages/homepage/footer/footer.html'
        };
    }

})();
