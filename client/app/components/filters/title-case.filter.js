(function() {
    'use strict';
    angular.module('common-filters')
        .filter('titleCase', titleCaseFilter);

    /* Returns a filter function that split a string into words */
    function titleCaseFilter() {
        return function(input) {
          var str = input.toLowerCase().split(' ');
          for (var i = 0; i < str.length; i++) {
            if (str[i].length > 3) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
          }
          return str.join(' ');
        };
    }

})();
