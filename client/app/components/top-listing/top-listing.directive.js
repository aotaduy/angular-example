(function() {
    'use strict';

    angular
        .module('moviesApp')
        .directive('topListing', topListDirective);
    function topListDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/top-listing/top-listing.html',
            scope: {
                movies: '='
            }
        };
    }
})();
