(function() {
    'use strict';

    // Create module and controller
    angular
        .module('randomDemo2')
        .factory('timeoutRetry', timeoutRetry);


    timeoutRetry.$inject = [
        '$injector',
        '$q',
    ];

    function timeoutRetry($injector, $q) {
        var service =  {
          responseError: function (response) {
            var $http = $injector.get('$http');
             if (response.status === -1) {
               return $http(response.config);
             }
             return response;
           }
         }

        return service;
    }

})();
