(function() {
    'use strict';
    angular.module('moviesApp')
        .config(configModule);

    configModule.$inject = [
      '$httpProvider'
    ];

    function configModule($httpProvider) {
      $httpProvider.defaults.headers.common = {
        'X-Powered-By': 'AngularJs 1.5'
      };
      $httpProvider.defaults.headers.get = {
        'Cache-Control': 'no-cache'
      };
    }

  })();
